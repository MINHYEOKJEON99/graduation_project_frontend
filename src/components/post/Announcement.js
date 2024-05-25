import style from './Announcement.module.css';
import { useState } from 'react';

export default function Announcement({ id, title, content }) {
  const [toggle, setToggle] = useState(false);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={style.container} onClick={onClickToggle}>
      <div className={style.title}>{title}</div>

      {toggle && (
        <div className={style.answer}>
          <div className={style.content}>{content}</div>
        </div>
      )}
    </div>
  );
}
