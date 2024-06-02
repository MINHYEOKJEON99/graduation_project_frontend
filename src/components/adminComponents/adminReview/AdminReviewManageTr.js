import { fetchAdminCommunityDelete, fetchReviewDelete } from '@/pages/api/api';
import style from './AdminReviewManageTr.module.css';
import { useRouter } from 'next/router';

export default function AdminReviewManageTr({
  reviewId,
  historyId,
  title,
  content,
  writerName,
  writerEmail,
  createdDate,
  modifiedDate,
}) {
  const router = useRouter();

  const onDelete = () => {
    const token = localStorage.getItem('loginToken');
    const result = confirm(`삭제하시겠습니까?`);
    if (result) {
      console.log(result);

      fetchReviewDelete(reviewId, token);
      alert('삭제되었습니다.');
      router.push('/admin');
    }
  };

  const onClickReview = () => {
    router.push({
      pathname: `/admin/epiloguemanage/epilogueDetail/${reviewId}`,
      query: { historyId, writerEmail },
    });
  };

  return (
    <tr>
      <td>{reviewId}</td>
      <td onClick={onClickReview} className={style.title}>
        {title}
      </td>
      <td>{content}</td>
      <td>{writerName}</td>
      <td>{createdDate}</td>
      <td>{modifiedDate}</td>
      <td className={style.delete} onClick={onDelete}>
        삭제
      </td>
    </tr>
  );
}
