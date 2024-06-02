import style from './EpilogueDetail.module.css';
import { FaRegEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {
  fetchReviewDelete,
  fetchReviewDetail,
  fetchReviewUserDelete,
  fetchVideoBack,
} from '@/pages/api/api';
import { Button } from '@mui/material';
import Video from '@/src/components/post/Video';
import { useRouter } from 'next/router';

export default function EpilogueDetail({
  id,
  historyId,
  onClick,
  writerEmail,
  admin,
}) {
  const [reviewDetail, setReviewDetail] = useState();
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState();
  const [isValid, setIsValid] = useState(false);
  const [token, setToken] = useState();

  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    setIsValid(localStorage.getItem('currentEmail') === writerEmail || admin);

    console.log(token);
    console.log(isValid);
  }, [token]);

  const setInit = async () => {
    const response = await fetchReviewDetail(id);

    if (response) {
      setReviewDetail(response.data);
    }
  };

  useEffect(() => {
    setInit();
  }, []);

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchVideoBack(historyId);
      if (response) {
        console.log(response);
        setVideo(URL.createObjectURL(response));
      }
    };
    setInitData();
  }, []);

  const onToggle = () => {
    setShowModal((prev) => !prev);
  };

  const ouClickUpdate = () => {
    router.push(`/user/epilogue/epilogueUpdate/${id}`);
  };

  const onClickDelete = async () => {
    confirm('후기를 삭제하시겠습니까?');

    if (confirm && admin) {
      await fetchReviewDelete(id, token);
      alert('삭제되었습니다');
      router.push('/admin/epiloguemanage');
    } else if (confirm) {
      await fetchReviewUserDelete(id, token);
      alert('삭제되었습니다');
      router.push('/user/epilogue');
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2 onClick={onClick}>후기 게시판</h2>
        </div>
        <div className={style.button_box}>
          <Button sx={{ fontWeight: 'bold' }} onClick={onToggle}>
            사고영상 & 과실비율 보기
          </Button>
          <div>
            {isValid && (
              <>
                {!admin && <Button onClick={ouClickUpdate}>수정하기</Button>}
                <Button onClick={onClickDelete}>삭제하기</Button>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <Video
            onToggle={onToggle}
            video={video}
            ratio={reviewDetail.negligence}
          />
        )}
        <div className={style.content_box}>
          <div>
            <div className={style.title}>
              <span>제목: {reviewDetail && reviewDetail.title}</span>
              <p>작성자:{reviewDetail && reviewDetail.writerName}</p>
            </div>
            <div className={style.content}>
              <p>{reviewDetail && reviewDetail.content}</p>
            </div>
          </div>
          <div className={style.like}>
            <FaRegEye size={20} />
            <span>{reviewDetail && reviewDetail.viewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
