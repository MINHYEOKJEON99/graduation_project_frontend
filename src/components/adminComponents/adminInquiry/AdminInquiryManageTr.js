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
    const result = confirm(`삭제하시겠습니까?`);
    if (result) {
      console.log(result);
      fetchAdminInquiryDelete(inquiryId);
    }
  };

  const onClickTr = () => {
    router.push(`/admin/customerservice/adminInquiryDetail/${inquiryId}`);
  };
  return (
    <tr style={style.tr} onClick={onClickTr}>
      <td>{inquiryId}</td>
      <td>{title}</td>
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
