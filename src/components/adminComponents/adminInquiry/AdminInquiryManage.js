import { useEffect, useState } from 'react';
import style from './AdminInquiryManage.module.css';
import { fetchAdminInquiry } from '@/pages/api/api';
import AdminInquiryManageTr from './AdminInquiryManageTr';

export default function AdminInquiryManage() {
  const [inquiry, setInquiry] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminInquiry();

      if (response) {
        setInquiry(response.data.content);
        console.log(inquiry);
      }
    }
    setInit();
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
            <th>답변 여부</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody className={style.body}>
          {inquiry &&
            inquiry.map((post) => (
              <AdminInquiryManageTr
                key={post.inquiryId}
                inquiryId={post.inquiryId}
                title={post.title}
                content={post.contents}
                writerName={post.writerName}
                createdDate={post.createdDate}
                replied={post.replied ? '답변완료' : '보류'}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
