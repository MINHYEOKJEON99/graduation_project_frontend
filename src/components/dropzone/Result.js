import { GridLoader } from 'react-spinners';
import style from './Result.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../UI/Button';
import { useRouter } from 'next/router';

export default function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const [one, setOne] = useState(true);
  const router = useRouter();
  const nickname = useSelector((state) => state.currentUserInfo.nickName);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOne(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onClickHome = () => {
    router.push('/');
  };
  const onClickEpilogue = () => {
    router.push('/user/epilogue/newepilogue');
  };

  let content = isLoading ? (
    <div className={style.container}>
      <GridLoader color="#dbe7f9" />
      {one ? <p>과실 비율 측정중...</p> : <p>동영상 분석중...</p>}
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.outbox_second}>
        <div className={style.title}>
          <p>{nickname || '방문자'} 님의</p>
          <p>과실 비율은?</p>
        </div>
        <div className={style.result}>
          <h1>
            <span style={{ color: 'black', fontSize: '50px' }}>80</span>{' '}
            <span style={{ color: 'black', fontSize: '50px' }}>:</span>
            <span style={{ color: 'black', fontSize: '50px' }}>20</span>
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
