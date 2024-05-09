import style from './Comment.module.css';
import profile from '../../assets/profile.png';
import Image from 'next/image';
import { Button } from '@mui/material';
import { fetchCommentDelete, fetchUpdateComment } from '@/pages/api/api';
import { useEffect, useState } from 'react';

export default function Comment({
  id,
  commentWriterName,
  createdDate,
  content,
}) {
  const [token, setToken] = useState();
  const [updateComment, setUpdateComment] = useState(content);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const onChangeComment = (e) => {
    setUpdateComment(e.target.value);
  };

  const onClickDelete = () => {
    fetchCommentDelete(id, token);
  };

  const onClickUpdate = () => {
    fetchUpdateComment(id, { content }, token);
  };

  const toggleButton = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={style.comment_box}>
      <div className={style.userInfo_box}>
        <Image src={profile} alt="profile" className={style.img} priority />
        <div className={style.userInfo}>
          <div className={style.nickname}>{commentWriterName}</div>
          <div className={style.date}>{createdDate}</div>
        </div>
      </div>
      <div>
        <div className={style.comment}>{content}</div>
        <Button onClick={toggleButton}>{toggle ? '닫기' : '수정하기'}</Button>
        <Button onClick={onClickDelete}>삭제</Button>
      </div>
      {toggle && (
        <div className={style.answer}>
          <div className={style.answer_write}>
            <textarea
              placeholder="댓글을 작성해주세요"
              value={updateComment}
              onChange={onChangeComment}
            />
            <Button onClick={onClickUpdate}>수정</Button>
          </div>
        </div>
      )}
    </div>
  );
}
