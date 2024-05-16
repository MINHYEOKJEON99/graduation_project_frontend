import style from './Result.module.css';
import React from 'react';
import Button from '../UI/Button';
import { useRouter } from 'next/router';

export default function Result({ nickname, video }) {
  const router = useRouter();

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
          <p>{nickname || '방문자'} 님의</p>
          {/* <p>과실 비율은?</p> */}
        </div>
        <div className={style.video_box}>
          <video muted controls width="100%" style={{ borderRadius: '8px' }}>
            <source src={video} controls type="video/mp4" />
          </video>
        </div>
        {/* <div className={style.result}>
          <h1>
            <span style={{ color: 'black', fontSize: '50px' }}>80</span>{' '}
            <span style={{ color: 'black', fontSize: '50px' }}>:</span>
            <span style={{ color: 'black', fontSize: '50px' }}>20</span>
          </h1>
        </div> */}
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
