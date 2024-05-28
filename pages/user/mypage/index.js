import style from './mypage.module.css';
import profile from '../../../src/assets/profile.png';
import Image from 'next/image';
import Button from '@/src/components/UI/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchMyPageUserInfo, fetchVideoBack } from '@/pages/api/api';
import AiRecord from '@/src/components/post/AiRecord';
import Video from '@/src/components/post/Video';

export default function Mypage() {
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [video, setVideo] = useState(null);

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
    console.log(currentUserInfo);
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

  const onOpenModal = () => {
    setShowModal(true);
    setShowVideo(false);
  };

  const onToggleModal = () => {
    setShowModal(false);
    setShowVideo(false);
  };

  const onClickRecord = async (id) => {
    const token = localStorage.getItem('loginToken');

    const response = await fetchVideoBack(id, token);
    if (response) {
      console.log(response);
      setVideo(URL.createObjectURL(response));
    }

    setShowModal(false);
    setShowVideo(true);
  };

  let content = <div />;

  if (showModal) {
    content = <AiRecord onToggle={onToggleModal} onClick={onClickRecord} />;
  } else if (showVideo) {
    content = <Video onToggle={onToggleModal} video={video} />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {content}
        <div className={style.box}>
          <h3>마이페이지</h3>
          <Image src={profile} alt="profile" className={style.img} priority />
          {currentUserInfo ? (
            <h3>{currentUserInfo.nickname}</h3>
          ) : (
            <h1>방문자</h1>
          )}
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
            onClickButton={onOpenModal}
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
