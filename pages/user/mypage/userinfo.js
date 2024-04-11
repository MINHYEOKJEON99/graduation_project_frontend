import Input from '@/src/components/UI/Input';
import style from './userinfo.module.css';
import profile from '../../../src/assets/profile.png';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function UserInfo() {
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
              placeholder={'이름'}
              disabled={true}
            />
            <Button style={{ color: 'black', backgroundColor: '#e1ebfa' }}>
              요청
            </Button>
          </div>
          <div className={style.content_box}>
            <p>닉네임:</p>
            <Input name={'nickname'} type={'text'} placeholder={'닉네임'} />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>아이디:</p>
            <Input
              name={'username'}
              type={'text'}
              placeholder={'아이디'}
              disabled={true}
            />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>이메일: </p>
            <Input name={'email'} type={'email'} placeholder={'이메일'} />
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
            <Input name={'birth'} placeholder={'생년월일'} disabled={true} />
            <div style={{ width: '66px' }} />
          </div>
          <div className={style.content_box}>
            <p>운전경력: </p>
            <Input
              name={'drive_license'}
              type={'number'}
              placeholder={'운전 면허경력 숫자만 입력'}
            />
            <div style={{ width: '66px' }} />
          </div>
          <input className={style.submitBtn} type="submit" value="수정하기" />
        </form>
      </div>
    </div>
  );
}
