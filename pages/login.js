import { useCallback, useState } from 'react';
import style from './login.module.css';
import { useRouter } from 'next/router';
import { fetchLogin } from './api/api';
import { useDispatch } from 'react-redux';
import { authActions } from '@/src/store/auth';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const adminData = { id: 'admin', password: '1234' };

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
      const token = await fetchLogin(loginData);
      console.log(token);
      localStorage.setItem('loginToken', token);
      dispatch(authActions.userLogin());
      router.push('/');
    },
    [loginData, dispatch, router]
  );

  return (
    <div className={style.container}>
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
  );
}
