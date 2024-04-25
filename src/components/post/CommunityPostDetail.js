import { useRouter } from 'next/router';
import style from './CommunityPostDetail.module.css';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

export default function CommunityPostDetail({ title, content, like }) {
  const router = useRouter();
  const [toggleHeart, setToggleHeart] = useState(false);

  const onClickCommunity = () => {
    router.push('/user/community');
  };

  const onToggleHeart = () => {
    setToggleHeart((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div onClick={onClickCommunity} className={style.box}>
          <h2>커뮤니티 게시판</h2>
        </div>
        <div className={style.content_box}>
          <div>
            <div className={style.title}>
              <span>제목: {title}</span>
              <p>작성자:{router.query.id}</p>
            </div>
            <div className={style.content}>
              <p>{content}</p>
            </div>
          </div>
          <div className={style.like}>
            {toggleHeart ? (
              <FaHeart
                onClick={onToggleHeart}
                color="red"
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaRegHeart
                onClick={onToggleHeart}
                style={{ cursor: 'pointer' }}
              />
            )}
            {like}
          </div>
        </div>
        <div className={style.answer}>
          <div>댓글</div>
        </div>
      </div>
    </div>
  );
}
