import { Button } from '@mui/material';
import style from './Dropdrag.module.css';
import React, { useCallback, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsFileEarmarkPlay } from 'react-icons/bs';

export default function Dropdrag() {
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [formDataState, setFormDataState] = useState({});
  const [showFile, setShowFile] = useState(false);

  const onToggleFile = () => {
    setShowFile((prev) => !prev);
  };

  const onDrop = useCallback((files) => {
    let formData = new FormData();
    // Do something with the files
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    const extractedData = {};
    for (let [key, value] of formData.entries()) {
      extractedData[key] = value;
    }
    setFormDataState(extractedData);
    setFileName(extractedData.file.name);
    setFilePath(extractedData.file.path);
    console.log(extractedData);
    setShowFile((prev) => !prev);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
      <video muted controls width="50%" style={{ borderRadius: '8px' }}>
        <source src={filePath} type="video/mp4" />
      </video>
    </div>
  );

  return (
    <div className={style.container}>
      {content}
      <input className={style.submitBtn} type="button" value="측정하기" />
    </div>
  );
}
