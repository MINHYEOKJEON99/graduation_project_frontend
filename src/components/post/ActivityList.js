import style from './ActivityList.module.css';

export default function ActivityList({ title, content, createdDate, onClick }) {
  return (
    <div className={style.content_wrapper}>
      <div onClick={onClick} className={style.content_box}>
        <div className={style.title}>{title}</div>
        <div className={style.content}>{content}</div>
        <div className={style.date}>{createdDate}</div>
      </div>
    </div>
  );
}
