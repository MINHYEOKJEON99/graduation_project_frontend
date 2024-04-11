import { useState } from 'react';
import style from './newpost.module.css';

export default function Newpost() {
  const [text, setText] = useState('');

  const onChangeText = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>글 작성</h2>
        </div>
        <div className={style.content_box}>
          <div className={style.title}>
            <span>제목: </span>
            <textarea className={style.title_post} />
          </div>
          <textarea
            className={style.content}
            onChange={onChangeText}
            value={text}
          />
        </div>
      </div>
      <div className={style.new_post}>
        <button className={style.button}>글쓰기</button>
      </div>
    </div>
  );
}
