import style from './Predictservice.module.css';
import Dropdrag from '@/src/components/dropzone/Dropdrag';
import Result from '@/src/components/dropzone/Result';
import { fetchMyPageUserInfo, fetchVideoUploadBack } from '@/pages/api/api';
import { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

export default function Predictservice() {
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [nickname, setNickname] = useState({});
  const [showVideo, setShowVideo] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [one, setOne] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      if (isLogin) {
        const response = await fetchMyPageUserInfo(token);

        if (response) {
          setNickname(response.data.nickname);
        }
      }
    };

    setInit();
  }, []);

  const onClickResult = (fileName) => {
    if (!fileName) {
      alert('영상 파일을 넣어주세요');
      return;
    }
    setIsLoading(true);
    setIsUpload(true);
  };
  const onUpload = async (data, video) => {
    // const file = `http://ceprj.gachon.ac.kr:60011/${filePath}`;
    const token = localStorage.getItem('loginToken');
    const ratio_post = data.fault_ratio;
    console.log(data);

    setRatio(data.fault_ratio);
    setIsUpload(false);

    await fetchVideoUploadBack(video, ratio_post, token);
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
          <Result ratio={ratio} />
        )
      ) : (
        // <Result nickname={currentUserInfo.nickcname} video={showVideo} />
        <Dropdrag
          onClick={onClickResult}
          onUploading={onUpload}
          isUpload={isUpload}
        />
      )}
    </>
  );
}
