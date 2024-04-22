import { useRouter } from 'next/router';
import style from './CommunityPost.module.css';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineInsertComment } from 'react-icons/md';

export default function CommunityPost({
  id,
  title,
  content,
  like,
  commentNum,
}) {
  const router = useRouter();

  const onClickCommunityDetail = () => {
    router.push(`/user/community/communityDetail/${id}`);
  };

  return (
    <div className={style.container} onClick={onClickCommunityDetail}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{content.slice(0, 75)}</div>
      <div className={style.like}>
        <FaHeart color="red" />
        {like}
        <MdOutlineInsertComment size={20} />
        {commentNum}
      </div>
    </div>
  );
}
