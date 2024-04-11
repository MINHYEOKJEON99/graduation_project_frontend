import { useRouter } from 'next/router';

import Image from 'next/image';
import logo from '../../assets/logo.png';
import logoBlack from '../../assets/logo_black.png';
import style from './Layout.module.css';
import Searchbar from '../search/Searchbar';

import { useScroll } from '@/src/hook/useScroll';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
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
    router.push('/community');
  };

  const onClickEpilogue = () => {
    router.push('/epilogue');
  };

  const onClickMyPage = () => {
    router.push('/mypage');
  };

  const onClickCustomerCenter = () => {
    router.push('/customercenter');
  };

  return (
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
        {router.pathname !== '/community' && <Searchbar q={q} />}
        <p onClick={onClickLogin} className={style.login}>
          로그인
        </p>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
}
