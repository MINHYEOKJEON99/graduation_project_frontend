import ActivityList from '@/src/components/post/ActivityList';
import style from './activity.module.css';

export default function Activity() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>활동 내역</h2>
        </div>
        <div className={style.category_box}>
          <div>작성 후기</div>
          <div className={style.middle_menu}>작성 글</div>
          <div>작성 댓글</div>
        </div>
        <ActivityList />
        <ActivityList />
        <ActivityList />
      </div>
    </div>
  );
}
