import style from './EpilogueDetail.module.css';
import { FaRegEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchReviewDetail, fetchVideoBack } from '@/pages/api/api';
import { Button } from '@mui/material';
import Video from '@/src/components/post/Video';

export default function EpilogueDetail({ id, historyId, onClick }) {
  const [reviewDetail, setReviewDetail] = useState();
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState();

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

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2 onClick={onClick}>후기 게시판</h2>
        </div>
        <Button onClick={onToggle}>사고영상 & 과실비율 보기</Button>
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
