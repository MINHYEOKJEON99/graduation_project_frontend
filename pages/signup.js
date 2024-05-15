//이름, 닉네임, 아이디, 이메일, 비밀번호, 비밀번호 확인, 생년월일, 운전면허 취득연도
import Input from '@/src/components/UI/Input';
import style from './signup.module.css';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSignUp } from './api/api';

export default function SignUp() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
    Myname: '',
    nickname: '',
    birth: '',
    driveExp: 0,
  });

  const {
    myName,
    nickname,
    username,
    email,
    password,
    passwordCheck,
    birth,
    driveExp,
  } = userInfo;

  const onValueChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      fetchSignUp(userInfo);
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
      // if (pwd !== confirmPwd) {
      //   setIsValid(false);
      //   alert('비밀번호를 확인해주세요');
      //   return;
      // }
      // dispatch(userInfoActions.addUserInfo(userInfo));
      // alert('회원가입이 되었습니다.');
      // router.push('/login');
    },
    [userInfo]
  );

  return (
    <div className={style.container}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit} className={style.joinForm}>
        <Input
          onChange={onValueChange}
          name={'myName'}
          type={'text'}
          placeholder={'이름'}
          value={myName}
        />
        <Input
          onChange={onValueChange}
          name={'nickname'}
          type={'text'}
          placeholder={'닉네임'}
          value={nickname}
        />
        <Input
          onChange={onValueChange}
          name={'username'}
          type={'text'}
          placeholder={'아이디'}
          value={username}
        />
        <Input
          onChange={onValueChange}
          name={'email'}
          type={'email'}
          placeholder={'이메일'}
          value={email}
        />
        <Input
          onChange={onValueChange}
          name={'password'}
          type={'password'}
          placeholder={'비밀번호'}
          value={password}
        />
        <Input
          onChange={onValueChange}
          name={'passwordCheck'}
          type={'password'}
          placeholder={'비밀번호 확인'}
          value={passwordCheck}
        />
        <Input
          onChange={onValueChange}
          name={'birth'}
          type={'date'}
          placeholder={'생년월일'}
          value={birth}
        />
        <Input
          onChange={onValueChange}
          name={'driveExp'}
          type={'number'}
          placeholder={'운전 면허경력 숫자만 입력'}
          value={driveExp}
        />
        <input className={style.submitBtn} type="submit" value="회원가입" />
      </form>
    </div>
  );
}
