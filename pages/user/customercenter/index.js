import CustomerCenterTable from '@/src/components/post/CustomerCenterTable';
import style from './customercenter.module.css';
import { useEffect, useState } from 'react';
import { fetchInquire } from '@/pages/api/api';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function CustomerCenter() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [list, setList] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchInquire();
      if (response) {
        setList(response.data.content);
      }
    }
    setInit();
    console.log(list);
  }, []);

  const onClickInquiry = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다');
      router.push('/login');
    }
    router.push('/user/customercenter/inquirywrite');
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title_box}>
          <h2>고객센터</h2>
          <div className={style.category_box}>
            <li>FAQ</li>
            <li>공지사항</li>
            <li onClick={onClickInquiry}>문의하기</li>
          </div>
        </div>
      </div>
      <CustomerCenterTable inquriyList={list} />
    </>
  );
}
