import style from './AdminHeader.module.css';
import Image from 'next/image';
import logo from '../../assets/logo.png';

import { CgProfile } from 'react-icons/cg';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { LiaComment } from 'react-icons/lia';
import { SlQuestion } from 'react-icons/sl';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

export default function AdminHeader({ children }) {
  const router = useRouter();

  const onClickAdmin = () => {
    router.push('/admin');
  };
  const onClickUserManage = () => {
    router.push('/admin/usermanage');
  };
  const onClickCommunityManage = () => {
    router.push('/admin/communitymanage');
  };
  const onClickEpilogueManage = () => {
    router.push('/admin/epiloguemanage');
  };
  const onClickCustomerService = () => {
    router.push('/admin/customerservice');
  };

  const onClickInformation = () => {
    router.push('/admin/information');
  };

  return (
    <div>
      <header className={style.header_admin}>
        <div className={style.logo} onClick={onClickAdmin}>
          <Image src={logo} alt="logo" className={style.img} priority />
        </div>
        <nav>
          <ul className={style.header_admin_nav}>
            <li onClick={onClickInformation}>
              <IoInformationCircleOutline size={25} />
              공지사항
            </li>
            <li onClick={onClickUserManage}>
              <CgProfile size={25} />
              사용자 계정 관리
            </li>
            <li onClick={onClickCommunityManage}>
              <HiOutlineChatBubbleLeftRight size={25} />
              커뮤니티 게시판 관리
            </li>
            <li onClick={onClickEpilogueManage}>
              <LiaComment size={25} />
              후기 게시판 관리
            </li>
            <li onClick={onClickCustomerService}>
              <SlQuestion size={25} />
              사용자 문의
            </li>
          </ul>
        </nav>

        <div />
      </header>
      <main className={style.main_admin}>{children}</main>
    </div>
  );
}
