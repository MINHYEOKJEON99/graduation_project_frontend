import Searchbar from '@/src/components/search/Searchbar';
import style from './adminpage.module.css';
import { Button } from '@mui/material';
import Card from '@/src/components/UI/Card';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { authActions } from '@/src/store/auth';

export default function AdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickAdminLogout = () => {
    dispatch(authActions.adminLogout());
    router.push('/');
  };
  return (
    <div className={style.background}>
      <nav className={`${style.admin_header} ${style.shadow}`}>
        <Searchbar />
        <Button onClick={onClickAdminLogout}>로그아웃</Button>
      </nav>
      <h2>관리자 페이지</h2>
      <div className={style.admin_main}>
        <div className={style.first_container}>
          <Card styled={style.user_manage}>
            <div className={style.dash_header}>사용자 계정 관리</div>
            <div className={style.dash_content}>개인정보</div>
          </Card>
          <Card styled={style.community_manage}>
            <div className={style.dash_header}>커뮤니티 관리</div>
            <div className={style.dash_content}>커뮤니티 글</div>
          </Card>
        </div>
        <div className={style.second_container}>
          <Card styled={style.epilogue_manage}>
            <div className={style.dash_header}>후기 게시판 관리</div>
            <div className={style.dash_content}>후기</div>
          </Card>
          <Card styled={style.qna_manage}>
            <div className={style.dash_header}>사용자 문의 관리</div>
            <div className={style.dash_content}>사용자 문의</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
