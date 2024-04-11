import { useRouter } from 'next/router';
import style from './CommunityPost.module.css';

export default function CommunityPost() {
  const router = useRouter();

  const onClickCommunity = () => {
    router.push('/community/communityDetail');
  };

  return (
    <div className={style.container} onClick={onClickCommunity}>
      <div className={style.title}>Title</div>
      <div className={style.content}>Content</div>
      <div className={style.like}>좋아요,댓글수</div>
    </div>
  );
}
