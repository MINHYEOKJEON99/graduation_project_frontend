import style from './AdminUserManageTr.module.css';
import { fetchAdminUserDelete } from '@/pages/api/api';

export default function AdminUserManageTr({
  myName,
  email,
  nickname,
  birth,
  driveExp,
}) {
  const onDelete = () => {
    const result = confirm(`삭제하시겠습니까?`);
    if (result) {
      console.log(result);
      fetchAdminUserDelete(boardId);
    }
  };
  return (
    <tr>
      <td>{myName}</td>
      <td>{email}</td>
      <td>{nickname}</td>
      <td>{birth}</td>
      <td>{driveExp}</td>
      <td className={style.delete} onClick={onDelete}>
        삭제
      </td>
    </tr>
  );
}
