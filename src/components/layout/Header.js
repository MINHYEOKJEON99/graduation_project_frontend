import Image from 'next/image';
import logo from '../../assets/logo.png';
import logoBlack from '../../assets/logo_black.png';
import style from './Header.module.css';
import Searchbar from '../search/Searchbar';
import { RxHamburgerMenu } from 'react-icons/rx';

import { useScroll } from '@/src/hook/useScroll';
import { useRouter } from 'next/router';
import Modal from '../UI/Modal';
import { useState } from 'react';

export default function Header({ children }) {
  const router = useRouter();
  const { q } = router.query;
  const [clickMenu, setClickMenu] = useState(false);

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
    setClickMenu(false);
  };

  const onClickEpilogue = () => {
    router.push('/user/epilogue');
    setClickMenu(false);
  };

  const onClickMyPage = () => {
    router.push('/user/mypage');
    setClickMenu(false);
  };

  const onClickCustomerCenter = () => {
    router.push('/user/customercenter');
    setClickMenu(false);
  };

  const onToggleMenu = () => {
    setClickMenu((prev) => !prev);
  };

  let content = clickMenu && (
    <Modal onHide={onToggleMenu}>
      <ul className={style.header_nav2}>
        <li onClick={onClickCommunity}>커뮤니티</li>
        <li onClick={onClickEpilogue}>후기</li>
        <li onClick={onClickMyPage}>마이페이지</li>
        <li onClick={onClickCustomerCenter}>고객센터</li>
      </ul>
    </Modal>
  );

  return (
    <div>
      <header className={headerStyle}>
        <RxHamburgerMenu
          onClick={onToggleMenu}
          className={style.hamburger}
          size={25}
        />
        {content}
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
  );
}
