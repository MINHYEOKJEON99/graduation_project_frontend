import style from './Epliogue.module.css';
import dummy_video from '../../assets/dummy_video.mp4';

const DUMMY_DATA = [
  {
    id: 1,
    title: '첫 후기',
    video: dummy_video,
    content: '유용해요',
    like: 4,
  },
];
export default function Epilogue() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <video muted>
          <source src={DUMMY_DATA.video} type="video/mp4" />
        </video>
        <div>{content}</div>
        <div>{like}</div>
      </div>
    </div>
  );
}
