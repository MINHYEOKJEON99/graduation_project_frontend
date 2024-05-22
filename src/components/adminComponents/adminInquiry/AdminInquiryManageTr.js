import { fetchAdminInquiryDelete } from '@/pages/api/api';
import style from './AdminInquiryManageTr.module.css';
import { useRouter } from 'next/router';

export default function AdminInquiryManageTr({
  inquiryId,
  title,
  content,
  writerName,
  createdDate,
  replied,
}) {
  const router = useRouter();

  const onDelete = () => {
    const token = localStorage.getItem('loginToken');
    const result = confirm(`문의글을 삭제하시겠습니까?`);
    if (result) {
      console.log(result);
      fetchAdminInquiryDelete(inquiryId, token);
      alert('삭제되었습니다.');
      router.push('/admin');
    }
  };

  const onClickTr = () => {
    router.push(`/admin/customerservice/adminInquiryDetail/${inquiryId}`);
  };
  return (
    <tr>
      <td>{inquiryId}</td>
      <td onClick={onClickTr} className={style.title}>
        {title}
      </td>
      <td>{content}</td>
      <td>{writerName}</td>
      <td>{createdDate}</td>
      <td>{replied}</td>
      <td className={style.delete} onClick={onDelete}>
        삭제
      </td>
    </tr>
  );
}
