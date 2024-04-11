import style from './ActivityList.module.css';

export default function ActivityList() {
  return (
    <div className={style.content_wrapper}>
      <div className={style.content_box}>
        <div className={style.category_detail}>카테고리</div>
        <div className={style.content}>내용</div>
        <div className={style.date}>날짜</div>
      </div>
    </div>
  );
}
