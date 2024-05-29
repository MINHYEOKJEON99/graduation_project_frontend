import style from './Result.module.css';
import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import { useRouter } from 'next/router';

export default function Result({ ratio }) {
  const router = useRouter();
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    setIsWindow(true);
  }, []);

  const onClickHome = () => {
    router.push('/');
  };
  const onClickEpilogue = () => {
    router.push('/user/epilogue/newepilogue');
  };

  let content = (
    <div className={style.container}>
      <div className={style.outbox_second}>
        <div className={style.title}>
          <p>사고현장 분석영상입니다.</p>
          <p>과실 비율은 ?</p>
        </div>
        {/* <div className={style.video_box}>
          {isWindow && (
            <ReactPlayer
              url={video}
              width="100%"
              height={'100%'}
              controls={true}
              playing={true}
              muted={true}
            />
          )}
        </div> */}
        <div className={style.result}>
          <h1>
            <span style={{ color: 'black', fontSize: '50px' }}>{ratio}</span>
            {/* <span style={{ color: 'black', fontSize: '50px' }}>:</span>
            <span style={{ color: 'black', fontSize: '50px' }}>20</span> */}
          </h1>
        </div>
        <Button
          onClickButton={onClickEpilogue}
          styles={{ width: '50%', marginTop: '0px' }}
        >
          후기 작성 하기
        </Button>
        <Button
          onClickButton={onClickHome}
          styles={{ width: '50%', marginTop: '0px' }}
        >
          홈으로
        </Button>
      </div>
    </div>
  );

  return <>{content}</>;
}
