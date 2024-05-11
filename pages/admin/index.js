import AdminUserInfo from '@/src/components/adminComponents/adminUserInfo/AdminUserInfo';
import style from './adminpage.module.css';

import Card from '@/src/components/UI/Card';
import AdminCommunityInfo from '@/src/components/adminComponents/AdminCommunity/AdminCommunityInfo';
import AdminInquiryInfo from '@/src/components/adminComponents/adminInquiry/AdminInquiryInfo';

export default function AdminPage() {
  return (
    <div className={style.admin_main}>
      <div className={style.first_container}>
        <Card styled={style.user_manage}>
          <div className={style.dash_header}>사용자 계정 관리</div>
          <div className={style.dash_content}>
            <AdminUserInfo />
          </div>
        </Card>
        <Card styled={style.community_manage}>
          <div className={style.dash_header}>커뮤니티 관리</div>
          <div className={style.dash_content}>
            <div className={style.community_header}>
              <div className={style.id}>No.</div>
              <div className={style.name}>닉네임</div>
              <div className={style.title}>제목</div>
              <div className={style.date}>작성날짜</div>
            </div>
            <AdminCommunityInfo />
          </div>
        </Card>
      </div>
      <div className={style.second_container}>
        <Card styled={style.epilogue_manage}>
          <div className={style.dash_header}>후기 게시판 관리</div>
          <div className={style.dash_content}>후기</div>
        </Card>
        <Card styled={style.qna_manage}>
          <div className={style.dash_header}>사용자 문의 관리</div>
          <div className={style.dash_content}>
            <div className={style.community_header}>
              <div className={style.id}>No.</div>
              <div className={style.name}>닉네임</div>
              <div className={style.title}>제목</div>
              <div className={style.date}>답변여부</div>
            </div>
            <AdminInquiryInfo />
          </div>
        </Card>
      </div>
    </div>
  );
}
