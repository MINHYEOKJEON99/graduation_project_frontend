import { fetchAdminCommunityDelete } from '@/pages/api/api';
import style from './AdminCommunityManageTr.module.css';

export default function AdminCommunityManageTr({
  boardId,
  title,
  content,
  writerName,
  createdDate,
  modifiedDate,
}) {
  const onDelete = () => {
    const result = confirm(`삭제하시겠습니까?`);
    if (result) {
      console.log(result);
      fetchAdminCommunityDelete(boardId);
    }
  };
  return (
    <tr>
      <td>{boardId}</td>
      <td>{title}</td>
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
