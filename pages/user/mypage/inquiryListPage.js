import CustomerCenterTable from '@/src/components/post/CustomerCenterTable';
import style from './InquiryList.module.css';
import { useEffect, useState } from 'react';
import { fetchMyPageInquiry } from '@/pages/api/api';
import Paginaition from '@/src/components/UI/Pagination';

export default function InquiryListPage() {
  const [token, setToken] = useState();
  const [list, setList] = useState();
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      setToken(localStorage.getItem('loginToken'));
      const response = await fetchMyPageInquiry(token, currentPage - 1);
      if (response) {
        setList(response.data.content);
        setTotalPage(response.data.totalPages);
      }
    }
    setInit();
    console.log(list);
  }, [token, currentPage]);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title_box}>
          <h2>문의내역</h2>
        </div>
      </div>
      <CustomerCenterTable inquriyList={list} />
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </>
  );
}
