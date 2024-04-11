import { useState } from 'react';
import style from './newepilogue.module.css';
import Modal from '@/src/components/UI/Modal';
import Button from '@/src/components/UI/Button';

export default function NewEpilogue() {
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onChangeText = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  const onToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  let content = showModal && (
    <Modal onHide={onToggleModal}>
      <h3>과거 기록조회</h3>
      <ul>
        <li>0000-00-00</li>
      </ul>
    </Modal>
  );
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 작성</h2>
        </div>
        <Button onClickButton={onToggleModal}>기록 조회</Button>
        {content}
        <div className={style.content_box}>
          <div className={style.title}>
            <span>제목: </span>
            <textarea className={style.title_post} />
          </div>
          <textarea
            placeholder="후기내용"
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
