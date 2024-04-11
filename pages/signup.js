//이름, 닉네임, 아이디, 이메일, 비밀번호, 비밀번호 확인, 생년월일, 운전면허 취득연도
import Input from '@/src/components/UI/Input';
import style from './signup.module.css';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const [birth, setBirth] = useState(null);

  useEffect(() => {
    console.log(typeof birth);
  }, [birth]);

  const onChangebirth = (e) => {
    setBirth(e.target.value);
  };

  return (
    <div className={style.container}>
      <h2>회원가입</h2>
      <form className={style.joinForm}>
        <Input name={'name'} type={'text'} placeholder={'이름'} />
        <Input name={'nickname'} type={'text'} placeholder={'닉네임'} />
        <Input name={'username'} type={'text'} placeholder={'아이디'} />
        <Input name={'email'} type={'email'} placeholder={'이메일'} />
        <Input name={'pwd'} type={'password'} placeholder={'비밀번호'} />
        <Input
          name={'confirmpwd'}
          type={'password'}
          placeholder={'비밀번호 확인'}
        />
        <Input
          name={'birth'}
          type={'date'}
          placeholder={'생년월일'}
          onChange={onChangebirth}
        />
        <Input
          name={'drive_license'}
          type={'number'}
          placeholder={'운전 면허경력 숫자만 입력'}
        />
        <input className={style.submitBtn} type="submit" value="회원가입" />
      </form>
    </div>
  );
}
