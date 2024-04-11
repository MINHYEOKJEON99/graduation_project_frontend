import style from './Epliogue.module.css';
const DUMMY_DATA = [
  {
    id: 1,
    title: '첫 후기',
    video: '',
    content: '유용해요',
  },
];
export default function Epilogue() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
      <div className={style.container}></div>
    </div>
  );
}
