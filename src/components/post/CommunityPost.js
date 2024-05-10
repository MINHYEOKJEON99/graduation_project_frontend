import { useRouter } from 'next/router';
import style from './CommunityPost.module.css';
import { FaRegEye } from 'react-icons/fa';
import { MdOutlineInsertComment } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { fetchComment } from '@/pages/api/api';

export default function CommunityPost({ id, title, content, viewCount }) {
  const router = useRouter();

  const [commentCount, setCommentCount] = useState();

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchComment(id);
      if (response) {
        setCommentCount(response.data.totalElements);
      }
    };

    setInitData();
  }, [id]);

  const onClickCommunityDetail = () => {
    router.push(`/user/community/communityDetail/${id}`);
  };

  return (
    <div className={style.container} onClick={onClickCommunityDetail}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{content.slice(0, 75)}</div>
      <div className={style.like}>
        <FaRegEye size={20} />
        {viewCount}
        <MdOutlineInsertComment size={20} />
        {commentCount}
      </div>
    </div>
  );
}
