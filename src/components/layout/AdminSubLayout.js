import { useRouter } from 'next/router';
import Searchbar from '../search/Searchbar';
import style from './AdminSubLayout.module.css';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '@/src/store/auth';

export default function AdminSubLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickAdminLogout = () => {
    dispatch(authActions.adminLogout());
    router.push('/');
  };
  return (
    <>
      <div className={style.background}>
        <nav className={`${style.admin_header} ${style.shadow}`}>
          <Searchbar />
          <Button onClick={onClickAdminLogout}>로그아웃</Button>
        </nav>
      </div>
      <div>
        <div className={style.main}>{children}</div>
        <footer className={style.footer}>@Gachon University</footer>
      </div>
    </>
  );
}
