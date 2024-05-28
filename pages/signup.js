//이름, 닉네임, 아이디, 이메일, 비밀번호, 비밀번호 확인, 생년월일, 운전면허 취득연도
import Input from '@/src/components/UI/Input';
import style from './signup.module.css';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchEmailCheck, fetchSignUp } from './api/api';
import { Button } from '@mui/material';

export default function SignUp() {
  const router = useRouter();

  const [emailCheck, setEmailCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
    myName: '',
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

  const onEmailCheck = async () => {
    const response = await fetchEmailCheck(userInfo.email);

    if (email.trim().length === 0) {
      alert('이메일을 입력해주세요');
      return;
    }

    if (!email.includes('@')) {
      alert('이메일 형식을 제대로 입력해주세요');
      return;
    }

    setEmailCheck(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      myName.trim().length === 0 ||
      nickname.trim().length === 0 ||
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      birth.trim().length === 0
    ) {
      alert('모든 정보를 입력해주세요');
      return;
    }

    if (emailCheck === false) {
      alert('이메일 중복체크를 해주세요');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호를 확인해주세요');
      return;
    }

    fetchSignUp(userInfo);
    alert('회원가입이 완료되었습니다.');
    router.push('/login');
    // dispatch(userInfoActions.addUserInfo(userInfo));
    // alert('회원가입이 되었습니다.');
    // router.push('/login');
  };

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
        <Button onClick={onEmailCheck} className={style.email_check}>
          중복 체크
        </Button>
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
        <div className={style.box2}>
          <span>생년월일</span>
          <Input
            onChange={onValueChange}
            name={'birth'}
            type={'date'}
            placeholder={'생년월일'}
            value={birth}
          />
        </div>
        <div className={style.box3}>
          <span>운전경력</span>
          <Input
            onChange={onValueChange}
            name={'driveExp'}
            type={'number'}
            placeholder={'운전 면허경력 숫자만 입력'}
            value={driveExp}
          />
        </div>
        <input className={style.submitBtn} type="submit" value="회원가입" />
      </form>
    </div>
  );
}
