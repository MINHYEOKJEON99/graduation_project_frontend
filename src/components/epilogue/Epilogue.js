import style from './Epliogue.module.css';
import dummy_video from '../../assets/dummy_video.mp4';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';

const DUMMY_DATA = [
  {
    id: 1,
    title: '첫 후기',
    video: dummy_video,
    content: '유용해요',
    like: 4,
  },
  {
    id: 2,
    title: '두번째 후기',
    video: dummy_video,
    content: '참고용으로 좋아요',
    like: 23,
  },
  {
    id: 3,
    title: '세번째 후기',
    video: dummy_video,
    content: '생각보다 잘맞아서 신기해요',
    like: 11,
  },
];

export default function Epilogue() {
  const router = useRouter();
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    setIsWindow(true);
  }, []);

  const onClickEpilogueDetail = () => {
    router.push('/user/epilogue/epilogueDetail');
  };

  let content = DUMMY_DATA.map((epilogue) => (
    <div key={epilogue.id} className={style.container}>
      {isWindow && (
        <ReactPlayer
          url={epilogue.video}
          width={'210px'}
          height={'45%'}
          controls={true}
          muted={true}
        />
      )}
      <div className={style.content_box}>
        <p>{epilogue.content}</p>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '5px',
            fontSize: '13px',
          }}
        >
          <FaHeart color="red" size={16} />
          {epilogue.like}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={style.wrapper} onClick={onClickEpilogueDetail}>
      {content}
    </div>
  );
}
