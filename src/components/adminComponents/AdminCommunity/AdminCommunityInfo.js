import style from './AdminCommunityInfo.module.css';

import { fetchAdminCommunityInfo } from '@/pages/api/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminCommunityInfo() {
  const router = useRouter();
  const [communityInfo, setCommunityInfo] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchAdminCommunityInfo();
      console.log(response);

      if (response) {
        setCommunityInfo(response.data.content);
      }
    }
    setInit();
  }, []);

  const onClickPost = (boardId) => {
    router.push(`/admin/communitymanage/communityDetail/${boardId}`);
  };

  return (
    <>
      {communityInfo &&
        communityInfo.map((post) => (
          <div
            key={post.boardId}
            className={style.container}
            onClick={() => onClickPost(post.boardId)}
          >
            <div className={style.id}>{post.boardId}</div>
            <div className={style.name}>{post.writerName}</div>
            <div className={style.title}>{post.title}</div>
            <div className={style.date}>{post.createdDate.slice(0, 10)}</div>
          </div>
        ))}
    </>
  );
}
