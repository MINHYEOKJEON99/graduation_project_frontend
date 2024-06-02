import style from './Epliogue.module.css';
import dummy_video from '../../assets/dummy_video.mp4';
import { FaHeart, FaRegEye } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { fetchVideoBack } from '@/pages/api/api';

export default function Epilogue({
  viewCount,
  content,
  historyId,
  id,
  writerEmail,
  admin,
}) {
  const router = useRouter();
  const [isWindow, setIsWindow] = useState(false);
  const [token, setToken] = useState('');

  const [video, setVideo] = useState();

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchVideoBack(historyId, token);
      if (response) {
        console.log(response);
        setVideo(URL.createObjectURL(response));
      }
    };
    setToken(localStorage.getItem('loginToken'));

    setInitData();
  }, []);

  useEffect(() => {
    setIsWindow(true);
  }, []);

  const onClickEpilogueDetail = () => {
    router.push({
      pathname: `/user/epilogue/epilogueDetail/${id}`,
      query: {
        historyId: historyId,
        writerEmail: writerEmail,
      },
    });
  };

  const ouClickUpdate = () => {
    router.push(pathname`/user/epilogue/epilogueUpdate/${id}`);
  };

  let content1 = (
    <div className={style.container}>
      {isWindow && (
        <ReactPlayer
          style={{ paddingBottom: '8px', margin: '0px' }}
          url={video}
          width={'auto'}
          height={'45%'}
          controls={true}
          playing={true}
          muted={true}
        />
      )}
      <div className={style.content_box}>
        <p>{content.length === 40 ? content + '...' : content}</p>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '5px',
            fontSize: '13px',
          }}
        >
          <FaRegEye size={20} />
          {viewCount}
        </div>
      </div>
    </div>
  );

  return (
    <div className={style.wrapper} onClick={onClickEpilogueDetail}>
      {content1}
    </div>
  );
}
