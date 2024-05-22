import style from './AdminInquiryInfo.module.css';

import { fetchAdminInquiry } from '@/pages/api/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminInquiryInfo() {
  const router = useRouter();
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

  const onClickInquiry = (id) => {
    router.push(`/admin/customerservice/adminInquiryDetail/${id}`);
  };

  return (
    <>
      {inquiry &&
        inquiry.map((inquiry) => (
          <div
            key={inquiry.inquiryId}
            onClick={() => onClickInquiry(inquiry.inquiryId)}
            className={style.container}
          >
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
