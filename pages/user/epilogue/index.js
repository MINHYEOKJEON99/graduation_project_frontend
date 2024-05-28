import Epilogue from '@/src/components/epilogue/Epilogue';

import style from './epilogue.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import { fetchReview } from '@/pages/api/api';

export default function EpiloguePage() {
  const [token, setToken] = useState();

  const [review, setReview] = useState();
  const router = useRouter();

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchReview();
      if (response) {
        setReview(response.data.content);
      }
    };
    setToken(localStorage.getItem('loginToken'));

    setInitData();
  }, []);

  const onClickNewEpilogue = () => {
    router.push('/user/epilogue/newepilogue');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 게시판</h2>
          {/* <a
            href="http://ceprj.gachon.ac.kr:60011/history/download?historyId=3"
            download
          >
            다운로드
          </a> */}
        </div>
        <div className={style.new_post}>
          <Button style={{ color: 'black' }} onClick={onClickNewEpilogue}>
            글쓰기
          </Button>
        </div>
        <div className={style.review_box}>
          {review &&
            review.map((review) => (
              <Epilogue
                key={review.reviewId}
                historyId={review.historyId}
                id={review.reviewId}
                title={review.title}
                content={review.content}
                viewCount={review.viewCount}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
