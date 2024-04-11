import style from './Dropdrag.module.css';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsFileEarmarkPlay } from 'react-icons/bs';

export default function Dropdrag() {
  const [fileName, setFileName] = useState('');
  const [formDataState, setFormDataState] = useState({});
  const [showFile, setShowFile] = useState(false);

  const onToggleFile = () => {
    setShowFile((prev) => !prev);
  };

  const handleDrop = (files) => {
    // 영상데이터 서버에 보내기
    // axios.post("/api/video/uploadfiles", formData, config).then((res) => {
    //   if (res.data.success) {
    //     let variable = {
    //       filePath: res.data.filePath,
    //       fileName: res.data.fileName,
    //     };
    //     setFilePath(res.data.filePath);
    //     axios.post("/api/video/thumbnail", variable).then((res) => {
    //       if (res.data.success) {
    //         setThumbnailPath(res.data.thumbsFilePath);
    //         setDuration(res.data.fileDuration);
    //       } else {
    //         alert("Failed to make the thumbnails");
    //       }
    //     });
    //   } else {
    //     alert("failed to save the video in server");
    //   }
    // });
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
    setShowFile((prev) => !prev);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  let content = !showFile ? (
    <div className={style.outbox}>
      <form>
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
        <button onClick={onToggleFile}>삭제</button>
      </div>
    </div>
  );

  return (
    <div className={style.container}>
      {content}
      <input className={style.submitBtn} type="button" value="측정하기" />
    </div>
  );
}
