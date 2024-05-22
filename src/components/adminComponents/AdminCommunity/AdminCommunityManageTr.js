import { fetchAdminCommunityDelete } from '@/pages/api/api';
import style from './AdminCommunityManageTr.module.css';
import { useRouter } from 'next/router';

export default function AdminCommunityManageTr({
  boardId,
  title,
  content,
  writerName,
  createdDate,
  modifiedDate,
}) {
  const router = useRouter();

  const onDelete = () => {
    const token = localStorage.getItem('loginToken');
    const result = confirm(`삭제하시겠습니까?`);
    if (result) {
      console.log(result);

      fetchAdminCommunityDelete(boardId, token);
      alert('삭제되었습니다.');
      router.push('/admin');
    }
  };

  const onClickCommunity = () => {
    router.push(`/admin/communitymanage/communityDetail/${boardId}`);
  };

  return (
    <tr>
      <td>{boardId}</td>
      <td onClick={onClickCommunity} className={style.title}>
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
