import { Button } from '@mui/material';
import style from './Dropdrag.module.css';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsFileEarmarkPlay } from 'react-icons/bs';
import { fetchCommunityFileUpload, fetchVideoUpload } from '@/pages/api/api';

export default function Dropdrag({ onClick }) {
  const [fileName, setFileName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [showVideo, setShowVideo] = useState(null);
  const [showFile, setShowFile] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const onToggleFile = () => {
    setShowFile((prev) => !prev);
  };

  const onUpload = async () => {
    onClick(fileName);

    const formData = new FormData();
    formData.append('file', videoFile); // 'file'은 서버에서 요구하는 필드명에 맞게 조정
    await fetchCommunityFileUpload(formData, token);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      setShowFile((prev) => !prev);
      // 첫 번째 파일만 사용 (다중 파일 업로드 미지원 시)
      const file = acceptedFiles[0];

      // 파일을 읽기 위해 URL.createObjectURL을 사용하여 임시 URL 생성
      const fileUrl = URL.createObjectURL(file);
      setShowVideo(fileUrl);
      setVideoFile(file);
      setFileName(file.name);
    },
    noKeyboard: true,
  });

  let content = !showFile ? (
    <div className={style.outbox}>
      <div className={style.form_box}>
        <div {...getRootProps()} className={style.box}>
          <input {...getInputProps()} />
          <BsClipboardPlus size={50} />
          <p>파일을 드래그하거나 클릭하세요.</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={style.outbox_second}>
      <div className={style.content_text}>
        <div>
          <BsFileEarmarkPlay size={20} />
          <p>{fileName}</p>
        </div>
        <Button onClick={onToggleFile} style={{ color: 'black' }}>
          삭제
        </Button>
      </div>
      <div className={style.video_box}>
        <video muted controls width="100%" style={{ borderRadius: '8px' }}>
          <source src={showVideo} controls />
        </video>
      </div>
    </div>
  );

  return (
    <div className={style.container}>
      {content}
      <input
        className={style.submitBtn}
        onClick={onUpload}
        type="button"
        value="측정하기"
      />
    </div>
  );
}
