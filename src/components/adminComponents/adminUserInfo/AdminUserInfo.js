import style from './AdminUserInfo.module.css';

import { fetchAdminUserInfo } from '@/pages/api/api';
import { useEffect, useState } from 'react';

export default function AdminUserInfo() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminUserInfo();
      console.log(response);

      if (response) {
        setUserInfo(response.data.content);
      }
    }
    setInit();
  }, []);

  return (
    <>
      {userInfo &&
        userInfo.map((user) => (
          <div key={user.email} className={style.container}>
            <div>{user.myName}</div>
            <div>{user.email}</div>
          </div>
        ))}
    </>
  );
}
