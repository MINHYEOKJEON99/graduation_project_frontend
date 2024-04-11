import { useRouter } from 'next/router';

import Image from 'next/image';
import logo from '../../assets/logo.png';
import logoBlack from '../../assets/logo_black.png';
import style from './Layout.module.css';
import Searchbar from '../search/Searchbar';

import { useScroll } from '@/src/hook/useScroll';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (!isAdmin && router.pathname.includes('admin')) {
      return () => {
        alert('관리자 로그인이 필요합니다.');
        router.push('/login');
      };
    }
  }, [router]);

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

  let content = !isAdmin ? (
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
          {Logo}
        </div>
        <nav>
          <ul className={style.header_admin_nav}>
            <li onClick={onClickCommunity}>사용자 계정 관리</li>
            <li onClick={onClickEpilogue}>커뮤니티 게시판 관리</li>
            <li onClick={onClickMyPage}>후기 게시판 관리</li>
            <li onClick={onClickCustomerCenter}>사용자 문의</li>
            <li onClick={onClickCustomerCenter}>AI 관리</li>
            <li onClick={onClickCustomerCenter}>관리자 정보 수정</li>
          </ul>
        </nav>

        <p onClick={onClickLogin} className={style.logout_admin}>
          로그아웃
        </p>
      </header>
      <main className={style.main_admin}>{children}</main>
    </div>
  );

  return <>{content}</>;
}
