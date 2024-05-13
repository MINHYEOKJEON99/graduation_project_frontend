import CustomerCenterTable from '@/src/components/post/CustomerCenterTable';
import style from './InquiryList.module.css';
import { useEffect, useState } from 'react';
import { fetchMyPageInquiry } from '@/pages/api/api';

export default function InquiryList() {
  const [token, setToken] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    async function setInit() {
      setToken(localStorage.getItem('loginToken'));
      const response = await fetchMyPageInquiry(token);
      if (response) {
        setList(response.data.content);
      }
    }
    setInit();
    console.log(list);
  }, [token]);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title_box}>
          <h2>문의내역</h2>
        </div>
      </div>
      <CustomerCenterTable inquriyList={list} />
    </>
  );
}
