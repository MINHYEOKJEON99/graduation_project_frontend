import style from './Epliogue.module.css';
import dummy_video from '../../assets/dummy_video.mp4';
import { FaHeart } from 'react-icons/fa';

const DUMMY_DATA = {
  id: 1,
  title: '첫 후기',
  video: dummy_video,
  content: '유용해요',
  like: 4,
};

export default function Epilogue() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <video muted controls width="210" style={{ borderRadius: '8px' }}>
          <source src={dummy_video} type="video/mp4" />
        </video>
        <div className={style.content_box}>
          <p>{DUMMY_DATA.content}</p>
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              gap: '5px',
              fontSize: '13px',
            }}
          >
            <FaHeart color="red" size={16} />
            {DUMMY_DATA.like}
          </div>
        </div>
      </div>
    </div>
  );
}
