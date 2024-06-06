import { useEffect, useState } from 'react';
import style from './AdminInquiryManage.module.css';
import { fetchAdminInquiry } from '@/pages/api/api';
import AdminInquiryManageTr from './AdminInquiryManageTr';
import Paginaition from '../../UI/Pagination';

export default function AdminInquiryManage() {
  const [inquiry, setInquiry] = useState();
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminInquiry(currentPage - 1);

      if (response) {
        setInquiry(response.data.content);
        setTotalPage(response.data.totalPages);
        console.log(inquiry);
      }
    }
    setInit();
  }, [currentPage]);

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
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </div>
  );
}
