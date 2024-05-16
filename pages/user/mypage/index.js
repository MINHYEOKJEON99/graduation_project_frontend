import style from './mypage.module.css';
import profile from '../../../src/assets/profile.png';
import Image from 'next/image';
import Button from '@/src/components/UI/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '@/src/components/UI/Modal';
import { useSelector } from 'react-redux';
import { fetchMyPageUserInfo } from '@/pages/api/api';

export default function Mypage() {
  const [showModal, setShowModal] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const userLogin = useSelector((state) => state.auth.isUserAuthenticated);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      const response = await fetchMyPageUserInfo(token);

      if (response) {
        setCurrentUserInfo(response);
      }
    };
    if (userLogin) {
      setInit();
    }
  }, []);

  const onClickAcitivity = () => {
    router.push('/user/mypage/activity');
  };

  const onClickUserInfo = () => {
    router.push({
      pathname: '/user/mypage/userinfo',
      query: {
        memberId: currentUserInfo.memberId,
        myName: currentUserInfo.myName,
        email: currentUserInfo.email,
        nickname: currentUserInfo.nickname,
        birth: currentUserInfo.birth,
        driveExp: currentUserInfo.driveExp,
      },
    });
  };

  const onClickInquiryList = () => {
    router.push('/user/mypage/inquiryList');
  };

  const onToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  let content = showModal && (
    <Modal onHide={onToggleModal}>
      <h3>과거 기록조회</h3>
      <ul>
        <li>0000-00-00</li>
      </ul>
    </Modal>
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {content}
        <div className={style.box}>
          <h3>마이페이지</h3>
          <Image src={profile} alt="profile" className={style.img} priority />
          {userLogin ? <h3>{currentUserInfo.nickName}</h3> : <h3>방문자</h3>}
        </div>
        <div className={style.content_box}>
          <Button
            styles={{
              width: '40%',
              height: '70px',
              backgroundColor: '#EFF1F3',
            }}
            onClickButton={onClickAcitivity}
          >
            활동 내역
          </Button>
          <Button
            styles={{
              width: '40%',
              height: '70px',
              backgroundColor: '#EFF1F3',
            }}
            onClickButton={onToggleModal}
          >
            과거 기록조회
          </Button>
          <Button
            styles={{
              width: '40%',
              height: '70px',
              backgroundColor: '#EFF1F3',
            }}
            onClickButton={onClickUserInfo}
          >
            회원 정보 수정
          </Button>
          <Button
            styles={{
              width: '40%',
              height: '70px',
              backgroundColor: '#EFF1F3',
            }}
            onClickButton={onClickInquiryList}
          >
            문의 내역
          </Button>
        </div>
      </div>
    </div>
  );
}
