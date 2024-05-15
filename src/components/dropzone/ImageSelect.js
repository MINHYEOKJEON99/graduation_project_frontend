import style from './ImageSelect.module.css';

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageSelect({ onFileUpload }) {
  const [fileName, setFileName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [showVideo, setShowVideo] = useState(null);
  const [showFile, setShowFile] = useState(false);
  const [token, setToken] = useState();

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('file', videoFile);
    onFileUpload(formData);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*,image/*',
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

  return (
    <>
      {!showFile ? (
        <Button>
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>파일 선택</p>
            </div>
          </div>
        </Button>
      ) : (
        <>
          <div className={style.file_box}>
            <p>{fileName}</p>
          </div>
          <Button onClick={onUpload}>파일 업로드</Button>
        </>
      )}
    </>
  );
}