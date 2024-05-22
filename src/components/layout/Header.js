import Image from 'next/image';
import logo from '../../assets/logo.png';
import logoBlack from '../../assets/logo_black.png';
import style from './Header.module.css';
import Searchbar from '../search/Searchbar';
import { RxHamburgerMenu } from 'react-icons/rx';

import { useScroll } from '@/src/hook/useScroll';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Menu from '../UI/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/src/store/auth';
import { currentUserInfoActions } from '@/src/store/currentUserInfo';
import { fetchMyPageUserInfo } from '@/pages/api/api';

export default function Header({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userLogin = useSelector((state) => state.auth.isUserAuthenticated);
  const { q } = router.query;
  const [clickMenu, setClickMenu] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState({});

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

  useEffect(() => {
    setIsLogin(localStorage.getItem('loginToken'));
    if (isLogin) {
      dispatch(authActions.userLogin());
    } else {
      dispatch(authActions.userLogout());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      if (isLogin) {
        const response = await fetchMyPageUserInfo(token);

        if (response) {
          setCurrentUserInfo(response);
          currentUserInfo && console.log(currentUserInfo);
        }
      }
    };

    setInit();
  }, []);

  const onClickHome = () => {
    router.push('/');
    setClickMenu(false);
  };

  const onClickLogin = () => {
    router.push('/login');
    setClickMenu(false);
  };

  const onClickLogout = () => {
    router.push('/');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('currentEmail');
    setIsLogin(null);
    dispatch(authActions.userLogout());
    dispatch(authActions.adminLogout());
    alert('로그아웃 되었습니다.');
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
    if (!userLogin) {
      setClickMenu(false);
      alert('로그인이 필요합니다.');
      router.push('/login');
    } else {
      router.push('/user/mypage');
      setClickMenu(false);
    }
  };

  const onClickCustomerCenter = () => {
    router.push('/user/customercenter');
    setClickMenu(false);
  };

  const onToggleMenu = () => {
    setClickMenu((prev) => !prev);
  };

  let content = clickMenu && (
    <Menu onHide={onToggleMenu}>
      <div className={style.modal_logo} onClick={onClickHome}>
        <Image src={logoBlack} alt="logo" className={style.img} priority />
      </div>
      {userLogin ? (
        <p className={style.modal_login2}>
          {currentUserInfo && currentUserInfo.nickname} 님, 안녕하세요
        </p>
      ) : (
        <p onClick={onClickLogin} className={style.modal_login}>
          로그인 후 이용해주세요
        </p>
      )}
      <ul className={style.header_nav2}>
        <li onClick={onClickCommunity}>커뮤니티</li>
        <li onClick={onClickEpilogue}>후기</li>
        <li onClick={onClickMyPage}>마이페이지</li>
        <li onClick={onClickCustomerCenter}>고객센터</li>
        <li onClick={onToggleMenu}>닫기</li>
      </ul>
    </Menu>
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
        {userLogin ? (
          <p onClick={onClickLogout} className={style.login}>
            로그아웃
          </p>
        ) : (
          <p onClick={onClickLogin} className={style.login}>
            로그인
          </p>
        )}
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
}
