import style from './AdminInquiryInfo.module.css';

import { fetchAdminInquiry } from '@/pages/api/api';
import { useEffect, useState } from 'react';

export default function AdminInquiryInfo() {
  const [inquiry, setInquiry] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminInquiry();
      console.log(response);

      if (response) {
        setInquiry(response.data.content);
      }
    }
    setInit();
  }, []);

  return (
    <>
      {inquiry &&
        inquiry.map((inquiry) => (
          <div key={inquiry.boardId} className={style.container}>
            <div className={style.id}>{inquiry.inquiryId}</div>
            <div className={style.name}>{inquiry.writerName}</div>
            <div className={style.title}>{inquiry.title}</div>
            <div className={style.date}>
              {inquiry.replied ? '답변완료' : '보류'}
            </div>
          </div>
        ))}
    </>
  );
}
