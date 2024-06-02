import { useState } from 'react';
import style from './newepilogue.module.css';
import Button from '@/src/components/UI/Button';
import AiRecord from '@/src/components/post/AiRecord';
import { fetchWriteReview } from '@/pages/api/api';
import { useRouter } from 'next/router';

export default function NewEpilogue() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [historyId, setHistoryId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  const [record, setRecord] = useState('');

  const router = useRouter();

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async () => {
    const token = localStorage.getItem('loginToken');
    const response = await fetchWriteReview(
      {
        title: title,
        content: text,
        historyId: historyId,
      },
      token
    );

    if (response) {
      alert('후기가 작성되었습니다.');
      router.push('/user/epilogue');
    }
  };

  const onClickRecord = (id, rec) => {
    setShowModal(false);
    setShowRecord(true);
    setHistoryId(id);
    setRecord(rec);
  };

  const onToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  let content = showModal && (
    <AiRecord onClick={onClickRecord} onToggle={onToggleModal} />
  );
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 작성</h2>
        </div>
        {!showRecord ? (
          <Button onClickButton={onToggleModal}>기록 조회</Button>
        ) : (
          <div className={style.record_box}>선택한 과실비율 : {record}</div>
        )}
        {content}
        <div className={style.content_box}>
          <div className={style.title}>
            <span>제목: </span>
            <textarea
              onChange={onChangeTitle}
              className={style.title_post}
              value={title}
            />
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
        <button onClick={onSubmit} className={style.button}>
          글쓰기
        </button>
      </div>
    </div>
  );
}
