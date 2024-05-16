import style from './Predictservice.module.css';
import Dropdrag from '@/src/components/dropzone/Dropdrag';
import Result from '@/src/components/dropzone/Result';
import { fetchMyPageUserInfo } from '@/pages/api/api';
import { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';

export default function Predictservice() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [showVideo, setShowVideo] = useState(null);
  const [one, setOne] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      const response = await fetchMyPageUserInfo(token);

      if (response) {
        setCurrentUserInfo(response);
      }
    };

    setInit();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOne(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onClickResult = (fileName) => {
    if (!fileName) {
      alert('영상 파일을 넣어주세요');
      return;
    }
    setIsLoading(true);
    setIsUpload(true);
  };
  const onUpload = (filePath) => {
    const file = filePath;

    console.log(file);
    // 파일을 읽기 위해 URL.createObjectURL을 사용하여 임시 URL 생성
    setShowVideo(file);
    setIsUpload(false);
  };

  return (
    <>
      {isLoading ? (
        isUpload ? (
          <div className={style.container}>
            <GridLoader color="#dbe7f9" />
            {one ? <p>과실 비율 측정중...</p> : <p>동영상 분석중...</p>}
          </div>
        ) : (
          <Result nickname={currentUserInfo.nickcname} video={showVideo} />
        )
      ) : (
        <Dropdrag
          onClick={onClickResult}
          onUploading={onUpload}
          isUpload={isUpload}
        />
      )}
    </>
  );
}
