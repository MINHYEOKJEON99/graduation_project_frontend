import { useEffect, useState } from 'react';
import style from './AdminReviewManage.module.css';
import { fetchReview } from '@/pages/api/api';
import AdminReivewManageTr from './AdminReviewManageTr';

export default function AdminReviewManage() {
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

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>작성날짜</th>
            <th>수정된 날짜</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody className={style.body}>
          {review &&
            review.map((post) => (
              <AdminReivewManageTr
                key={post.reviewId}
                reviewId={post.reviewId}
                historyId={post.historyId}
                title={post.title}
                content={post.content.slice(0, 20)}
                writerName={post.writerName}
                createdDate={post.createdDate.slice(0, 10)}
                modifiedDate={post.modifiedDate.slice(0, 10)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
