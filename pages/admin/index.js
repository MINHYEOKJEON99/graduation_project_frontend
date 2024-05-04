import style from './adminpage.module.css';

import Card from '@/src/components/UI/Card';

export default function AdminPage() {
  return (
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
  );
}
