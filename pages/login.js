import { useState } from 'react';
import style from './login.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { adminAuthActions, authActions } from '@/src/store/auth';
import { currentUserInfoActions } from '@/src/store/currentUserInfo';

export default function Login() {
  const dispatch = useDispatch();
  const userLoginData = useSelector((state) => state.userInfo);

  const router = useRouter();
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  const adminData = { id: 'admin', password: '1234' };

  const onClickSignUp = () => {
    router.push('/signup');
  };

  const onChangeIdData = (e) => {
    setLoginData((prev) => {
      return {
        id: e.target.value,
        password: prev.password,
      };
    });
  };

  const onChangePasswordData = (e) => {
    setLoginData((prev) => {
      return {
        id: prev.id,
        password: e.target.value,
      };
    });
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    console.log(loginData);
    if (
      loginData.id === adminData.id &&
      loginData.password === adminData.password
    ) {
      dispatch(adminAuthActions.adminLogin());
      router.push('/admin');
    } else {
      setLoginData({
        id: '',
        password: '',
      });
    }

    const user = userLoginData.find(
      (userInfo) =>
        userInfo.username === loginData.id &&
        userInfo.pwd === loginData.password
    );
    if (user) {
      dispatch(authActions.userLogin());
      dispatch(currentUserInfoActions.addCurrentUserInfo(user));
      console.log('로그인 성공');
      console.log(user);
      router.push('/');
    } else {
      console.log('로그인 실패');
    }
  };

  return (
    <div className={style.container}>
      <form className={style.joinForm} onSubmit={onSubmitData}>
        <h2>로그인</h2>
        <div className={style.textForm}>
          <input
            name="id"
            type="text"
            className={style.value}
            onChange={onChangeIdData}
            value={loginData.id}
            placeholder="아이디"
          />
        </div>
        <div className={style.textForm}>
          <input
            name="password"
            type="password"
            className={style.value}
            onChange={onChangePasswordData}
            value={loginData.password}
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
