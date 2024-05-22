import { useCallback, useState } from 'react';
import style from './login.module.css';
import { useRouter } from 'next/router';
import { fetchLogin } from './api/api';
import { useDispatch } from 'react-redux';
import { authActions } from '@/src/store/auth';
import Image from 'next/image';
import loginImg from '@/src/assets/login.jpg';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const adminData = { id: 'admin@naver.com', password: '1234' };

  //회원가입페이지 이동버튼
  const onClickSignUp = () => {
    router.push('/signup');
  };

  const onChangeEmailData = (e) => {
    setLoginData((prev) => {
      return {
        email: e.target.value,
        password: prev.password,
      };
    });
  };

  const onChangePasswordData = (e) => {
    setLoginData((prev) => {
      return {
        email: prev.email,
        password: e.target.value,
      };
    });
  };

  const onSubmitData = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        loginData.email === adminData.id &&
        loginData.password === adminData.password
      ) {
        const token = await fetchLogin(loginData);
        localStorage.setItem('loginToken', token);
        localStorage.setItem('currentEmail', loginData.email);
        dispatch(authActions.adminLogin());
        dispatch(authActions.userLogin());
        router.push('/admin');
        return;
      }

      try {
        const token = await fetchLogin(loginData);

        if (token) {
          localStorage.setItem('loginToken', token);
          localStorage.setItem('currentEmail', loginData.email);
          setTimeout(() => {
            localStorage.removeItem('loginToken');
            localStorage.removeItem('currentEmail');
            dispatch(authActions.userLogout());
          }, 1800000);

          dispatch(authActions.userLogin());
          alert('로그인 되었습니다.');
          router.push('/');
        }
      } catch (e) {
        console.log(e);
      }
    },
    [loginData, dispatch, router]
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.text_box}>
          <p>과실비율 측정을 위한 ai 서비스</p>
          <p>로그인하고 간편하게 서비스를</p>
          <p>경험하세요.</p>
          <p className={style.en1}>Traffic accident fault rate</p>
          <p className={style.en2}>measurement service</p>
        </div>
        <Image
          src={loginImg}
          className={style.img}
          alt="loginImg"
          height={700}
        />
        <form className={style.joinForm} onSubmit={onSubmitData}>
          <h2>로그인</h2>
          <div className={style.textForm}>
            <input
              name="email"
              type="text"
              className={style.value}
              onChange={onChangeEmailData}
              value={loginData.email || ''}
              placeholder="이메일"
            />
          </div>
          <div className={style.textForm}>
            <input
              name="password"
              type="password"
              className={style.value}
              onChange={onChangePasswordData}
              value={loginData.password || ''}
              placeholder="비밀번호"
            />
          </div>
          <input className={style.submitBtn} type="submit" value="로그인" />
          <input
            className={style.submitBtn}
            onClick={onClickSignUp}
            type="button"
            value="회원가입"
          />
        </form>
      </div>
    </div>
  );
}
