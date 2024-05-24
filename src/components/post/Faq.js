import style from './Faq.module.css';
import { useState } from 'react';

export default function Faq({ title, content }) {
  const [toggle, setToggle] = useState(false);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={style.container} onClick={onClickToggle}>
      <div className={style.title}>질문: {title}</div>

      {toggle && (
        <div className={style.answer}>
          답변:
          <div className={style.content}>{content}</div>
        </div>
      )}
    </div>
  );
}
