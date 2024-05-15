import Input from '@/src/components/UI/Input';
import style from './userinfo.module.css';
import profile from '../../../src/assets/profile.png';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMyPageUpdate, fetchMyPageUserDelete } from '@/pages/api/api';
import { useDispatch } from 'react-redux';
import { authActions } from '@/src/store/auth';

export default function UserInfo() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { memberId, myName, nickname, email, birth, driveExp } = router.query;

  const [changeNickname, setChangeNickname] = useState(nickname);
  const [name, setName] = useState(myName);
  const [token, setToken] = useState();
  const [changeEmail, setChangeEmail] = useState(email);
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [changeDrivingExperience, setchangeDrivingExperience] =
    useState(driveExp);
  const [changeBirth, setChangeBirth] = useState(birth);

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
  }, []);

  const onChangeNickname = (e) => {
    setChangeNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeBirth = (e) => {
    setChangeBirth(e.target.value);
  };
  const onChangedriving = (e) => {
    setchangeDrivingExperience(e.target.value);
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      password: password,
      passwordCheck: passwordConfirm,
      myName: name,
      username: email,
      nickname: changeNickname,
      birth: changeBirth,
      driveExp: changeDrivingExperience,
    };

    try {
      await fetchMyPageUpdate(updatedInfo, token);
      alert('수정되었습니다.');
      router.push('/user/mypage');
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDelete = () => {
    const token = localStorage.getItem('loginToken');
    confirm('정말 탈퇴하시겠습니까?');
    if (confirm) {
      try {
        fetchMyPageUserDelete(memberId, token);
        alert('탈퇴되었습니다.');
        dispatch(authActions.userLogout());
        router.push('/');
      } catch (e) {
        console.lot(e);
      }
    }
  };

  return (
    <div className={style.container}>
      <h2>회원정보 수정</h2>
      <Image src={profile} alt="profile" className={style.img} priority />
      <div style={{ marginLeft: '20px' }}>
        <form onSubmit={onSubmitChange} className={style.joinForm}>
          <div className={style.content_box}>
            <p>이름:</p>
            <Input name={'name'} type={'text'} disabled={true} value={name} />
            <Button style={{ color: 'black', backgroundColor: '#e1ebfa' }}>
              요청
            </Button>
          </div>
          <div className={style.content_box}>
            <p>닉네임:</p>
            <Input
              name={'nickname'}
              type={'text'}
              onChange={onChangeNickname}
              value={changeNickname}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>이메일: </p>
            <Input
              name={'email'}
              type={'email'}
              disabled={true}
              value={changeEmail}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>비밀번호: </p>
            <Input
              name={'password'}
              type={'password'}
              onChange={onChangePassword}
              value={password}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>비밀번호 체크: </p>
            <Input
              name={'passwordConfirm'}
              type={'password'}
              onChange={onChangePasswordConfirm}
              value={passwordConfirm}
            />
            <div style={{ width: '66px' }} />
          </div>

          <div className={style.content_box}>
            <p>생년월일: </p>
            <Input
              name={'birth'}
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
              value={changeDrivingExperience}
            />
            <div style={{ width: '66px' }} />
          </div>
          <input className={style.submitBtn} type="submit" value="수정하기" />
          <input
            onClick={onClickDelete}
            className={style.submitBtn2}
            type="button"
            value="회원탈퇴"
          />
        </form>
      </div>
    </div>
  );
}
