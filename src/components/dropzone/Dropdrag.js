import { Button } from '@mui/material';
import style from './Dropdrag.module.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsFileEarmarkPlay } from 'react-icons/bs';

export default function Dropdrag({ onClick }) {
  const [fileName, setFileName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [showFile, setShowFile] = useState(false);

  const onToggleFile = () => {
    setShowFile((prev) => !prev);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      setShowFile((prev) => !prev);
      // 첫 번째 파일만 사용 (다중 파일 업로드 미지원 시)
      const file = acceptedFiles[0];

      // 파일을 읽기 위해 URL.createObjectURL을 사용하여 임시 URL 생성
      const fileUrl = URL.createObjectURL(file);
      setVideoFile(fileUrl);
      setFileName(file.name);
    },
    noKeyboard: true,
  });

  let content = !showFile ? (
    <div className={style.outbox}>
      <form className={style.form_box}>
        <div {...getRootProps()} className={style.box}>
          <input {...getInputProps()} />
          <BsClipboardPlus size={50} />
          <p>파일을 드래그하거나 클릭하세요.</p>
        </div>
      </form>
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
          <source src={videoFile} controls />
        </video>
      </div>
    </div>
  );

  return (
    <div className={style.container}>
      {content}
      <input
        className={style.submitBtn}
        onClick={onClick}
        type="button"
        value="측정하기"
      />
    </div>
  );
}
