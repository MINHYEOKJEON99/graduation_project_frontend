import Input from '@/src/components/UI/Input';
import style from './userinfo.module.css';
import profile from '../../../src/assets/profile.png';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function UserInfo() {
  const userInfo = useSelector((state) => state.currentUserInfo);
  const { name, nickName, username, email, birth, drivingExperience } =
    userInfo;
  const [changeNickname, setChangeNickname] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const [changeDrivingExperience, setchangeDrivingExperience] = useState(null);
  const [changeBirth, setChangeBirth] = useState(birth);

  const onChangeNickname = (e) => {
    setChangeNickname(e.target.value);
  };
  const onChangeEmail = (e) => {
    setChangeEmail(e.target.value);
  };
  const onChangeBirth = (e) => {
    setChangeBirth(e.target.value);
  };
  const onChangedriving = (e) => {
    setchangeDrivingExperience(e.target.value);
  };

  return (
    <div className={style.container}>
      <h2>회원정보 수정</h2>
      <Image src={profile} alt="profile" className={style.img} priority />
      <div style={{ marginLeft: '20px' }}>
        <form className={style.joinForm}>
          <div className={style.content_box}>
            <p>이름:</p>
            <Input
              name={'name'}
              type={'text'}
              placeholder={name}
              disabled={true}
            />
            <Button style={{ color: 'black', backgroundColor: '#e1ebfa' }}>
              요청
            </Button>
          </div>
          <div className={style.content_box}>
            <p>닉네임:</p>
            <Input
              name={'nickname'}
              type={'text'}
              placeholder={nickName}
              onChange={onChangeNickname}
              value={changeNickname}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>아이디:</p>
            <Input
              name={'username'}
              type={'text'}
              placeholder={username}
              disabled={true}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>이메일: </p>
            <Input
              name={'email'}
              type={'email'}
              placeholder={email}
              onChange={onChangeEmail}
              value={changeEmail}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>비밀번호: </p>

            <Button
              style={{
                color: 'black',
                backgroundColor: '#e1ebfa',
                marginLeft: '30px',
                width: '50%',
              }}
            >
              재설정
            </Button>
            <div style={{ width: '110px' }} />
          </div>
          <div className={style.content_box}>
            <p>생년월일: </p>
            <Input
              name={'birth'}
              placeholder={birth}
              type="date"
              onChange={onChangeBirth}
              value={changeBirth}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>운전경력: </p>
            <Input
              name={'drive_license'}
              type={'number'}
              onChange={onChangedriving}
              placeholder={drivingExperience}
              value={changeDrivingExperience}
            />
            <div style={{ width: '66px' }} />
          </div>
          <input className={style.submitBtn} type="submit" value="수정하기" />
        </form>
      </div>
    </div>
  );
}
