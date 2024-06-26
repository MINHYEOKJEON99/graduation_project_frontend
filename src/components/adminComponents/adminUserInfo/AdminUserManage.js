import { useEffect, useState } from 'react';
import style from './AdminUserManage.module.css';
import { fetchAdminUserInfo } from '@/pages/api/api';
import AdminUserManageTr from './AdminUserManageTr';
import Paginaition from '../../UI/Pagination';

export default function AdminUserManage() {
  const [userInfo, setUserInfo] = useState();
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminUserInfo(currentPage - 1);

      if (response) {
        setUserInfo(response.data.content);
        setTotalPage(response.data.totalPages);
        console.log(userInfo);
      }
    }
    setInit();
  }, [currentPage]);

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>생년월일</th>
            <th>운전경력</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody className={style.body}>
          {userInfo &&
            userInfo.map((user) => (
              <AdminUserManageTr
                key={user.email}
                memberId={user.memberId}
                myName={user.myName}
                email={user.email}
                nickname={user.nickname}
                birth={user.birth}
                driveExp={user.driveExp}
              />
            ))}
        </tbody>
      </table>
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </div>
  );
}
