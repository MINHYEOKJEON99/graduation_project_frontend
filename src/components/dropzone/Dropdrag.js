import style from './Dropdrag.module.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsClipboardPlus } from 'react-icons/bs';

export default function Dropdrag() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  return (
    <div className={style.container}>
      <div className={style.outbox}>
        <div {...getRootProps()} className={style.box}>
          <input {...getInputProps()} />
          <BsClipboardPlus size={50} />
          <p>파일을 드래그하거나 클릭하세요.</p>
        </div>
      </div>
      <input className={style.submitBtn} type="button" value="측정하기" />
    </div>
  );
}
