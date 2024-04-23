//이름, 닉네임, 아이디, 이메일, 비밀번호, 비밀번호 확인, 생년월일, 운전면허 취득연도
import Input from '@/src/components/UI/Input';
import style from './signup.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoActions } from '@/src/store/userInfo';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmPwd, setConfirmPwd] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    nickName: '',
    username: '',
    email: '',
    pwd: '',
    birth: '',
    drivingExperience: 0,
  });

  const { name, nickname, username, email, pwd, birth, drivingExperience } =
    userInfo;

  const onValueChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCpwd = (e) => {
    setConfirmPwd(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      setIsValid(false);
      alert('비밀번호를 확인해주세요');
      return;
    }
    dispatch(userInfoActions.addUserInfo(userInfo));
    alert('회원가입이 되었습니다.');
    router.push('/login');
  };

  return (
    <div className={style.container}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit} className={style.joinForm}>
        <Input
          onChange={onValueChange}
          name={'name'}
          type={'text'}
          placeholder={'이름'}
          value={name}
        />
        <Input
          onChange={onValueChange}
          name={'nickName'}
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
          name={'pwd'}
          type={'password'}
          placeholder={'비밀번호'}
          value={pwd}
        />
        <Input
          onChange={onChangeCpwd}
          name={'confirmpwd'}
          type={'password'}
          placeholder={'비밀번호 확인'}
          value={confirmPwd}
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
          name={'drivingExperience'}
          type={'number'}
          placeholder={'운전 면허경력 숫자만 입력'}
          value={drivingExperience}
        />
        <input className={style.submitBtn} type="submit" value="회원가입" />
      </form>
    </div>
  );
}
