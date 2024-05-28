import { fetchReview } from '@/pages/api/api';
import style from './AdminReview.module.css';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminReview() {
  const router = useRouter();
  const [review, setReview] = useState();

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchReview();
      if (response) {
        setReview(response.data.content);
      }
    };

    setInitData();
  }, []);

  const onClickReview = (reviewId, historyId) => {
    router.push({
      pathname: `/admin/epiloguemanage/epilogueDetail/${reviewId}`,
      query: { historyId },
    });
  };

  return (
    <>
      {review &&
        review.map((post) => (
          <div
            key={post.boardId}
            className={style.container}
            onClick={() => onClickReview(post.reviewId, post.historyId)}
          >
            <div className={style.id}>{post.reviewId}</div>
            <div className={style.name}>{post.writerName}</div>
            <div className={style.title}>{post.title}</div>
            <div className={style.date}>{post.createdDate.slice(0, 10)}</div>
          </div>
        ))}
    </>
  );
}
