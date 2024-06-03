import { useEffect, useState } from 'react';
import style from './AdminCommunityManage.module.css';
import { fetchAdminCommunityInfo } from '@/pages/api/api';
import AdminCommunityManageTr from './AdminCommunityManageTr';
import Paginaition from '../../UI/Pagination';

export default function AdminCommunityManage() {
  const [communityInfo, setcommunityInfo] = useState();
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminCommunityInfo(currentPage - 1);

      if (response) {
        setcommunityInfo(response.data.content);
        setTotalPage(response.data.totalPages);
        console.log(communityInfo);
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
            <th>수정된 날짜</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody className={style.body}>
          {communityInfo &&
            communityInfo.map((post) => (
              <AdminCommunityManageTr
                key={post.boardId}
                boardId={post.boardId}
                title={post.title}
                content={post.content.slice(0, 20)}
                writerName={post.writerName}
                createdDate={post.createdDate.slice(0, 10)}
                modifiedDate={post.modifiedDate.slice(0, 10)}
              />
            ))}
        </tbody>
      </table>
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </div>
  );
}
