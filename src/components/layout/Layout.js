import { useRouter } from 'next/router';

import Image from 'next/image';
import logo from '../../assets/logo.png';
import logoBlack from '../../assets/logo_black.png';
import style from './Layout.module.css';
import Searchbar from '../search/Searchbar';

import { useScroll } from '@/src/hook/useScroll';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { LiaComment } from 'react-icons/lia';
import { SlQuestion } from 'react-icons/sl';
import { LuBrainCircuit } from 'react-icons/lu';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdmin = useSelector((state) => state.adminAuth.isAdminAuthenticated);
  useEffect(() => {
    if (!isAdmin && router.pathname.includes('admin')) {
      router.push('/login');
    }
  }, [router.pathname, isAdmin]);

  const { q } = router.query;

  const { y } = useScroll();
  let headerStyle = style.header;
  let Logo = <Image src={logo} alt="logo" className={style.img} priority />;

  if (router.pathname === '/') {
    if (y > 580) {
      headerStyle = style.headerScroll;
      Logo = (
        <Image src={logoBlack} alt="logoBlack" className={style.img} priority />
      );
    }
  } else {
    headerStyle = style.otherHeader;
    Logo = (
      <Image src={logoBlack} alt="logoBlack" className={style.img} priority />
    );
  }

  const onClickHome = () => {
    router.push('/');
  };

  const onClickLogin = () => {
    router.push('/login');
  };

  const onClickCommunity = () => {
    router.push('/user/community');
  };

  const onClickEpilogue = () => {
    router.push('/user/epilogue');
  };

  const onClickMyPage = () => {
    router.push('/user/mypage');
  };

  const onClickCustomerCenter = () => {
    router.push('/uesr/customercenter');
  };

  let content =
    !isAdmin && !router.pathname.includes('admin') ? (
      <div>
        <header className={headerStyle}>
          <div className={style.logo} onClick={onClickHome}>
            {Logo}
          </div>
          <nav>
            <ul className={style.header_nav}>
              <li onClick={onClickCommunity}>커뮤니티</li>
              <li onClick={onClickEpilogue}>후기</li>
              <li onClick={onClickMyPage}>마이페이지</li>
              <li onClick={onClickCustomerCenter}>고객센터</li>
            </ul>
          </nav>
          {router.pathname !== '/user/community' && <Searchbar q={q} />}
          <p onClick={onClickLogin} className={style.login}>
            로그인
          </p>
        </header>
        <main className={style.main}>{children}</main>
      </div>
    ) : (
      <div>
        <header className={style.header_admin}>
          <div className={style.logo} onClick={onClickHome}>
            <Image src={logo} alt="logo" className={style.img} priority />
          </div>
          <nav>
            <ul className={style.header_admin_nav}>
              <li onClick={onClickCommunity}>
                <CgProfile size={25} />
                사용자 계정 관리
              </li>
              <li onClick={onClickEpilogue}>
                <HiOutlineChatBubbleLeftRight size={25} />
                커뮤니티 게시판 관리
              </li>
              <li onClick={onClickMyPage}>
                <LiaComment size={25} />
                후기 게시판 관리
              </li>
              <li onClick={onClickCustomerCenter}>
                <SlQuestion size={25} />
                사용자 문의
              </li>
              <li onClick={onClickCustomerCenter}>
                <LuBrainCircuit size={23} />
                AI 관리
              </li>
            </ul>
          </nav>

          <div />
        </header>
        <main className={style.main_admin}>{children}</main>
      </div>
    );

  return <>{content}</>;
}
