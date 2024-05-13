import { fetchMyPageCommunityDelete } from '@/pages/api/api';
import style from './ActivityList.module.css';
import { IoTrash } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function ActivityList({
  id,
  title,
  content,
  createdDate,
  onClick,
  onDelete,
}) {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  });

  return (
    <div className={style.content_wrapper}>
      <div onClick={onClick} className={style.content_box}>
        <div className={style.title}>{title}</div>
        <div className={style.content}>{content}</div>
        <div className={style.date}>{createdDate}</div>
      </div>
      <IoTrash
        onClick={onDelete.bind(null, id, token)}
        color="#ccc"
        size={'35px'}
        className={style.delete}
      />
    </div>
  );
}
