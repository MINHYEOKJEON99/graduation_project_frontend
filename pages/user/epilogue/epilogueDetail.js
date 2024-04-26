import { useRouter } from 'next/router';
import style from './epilogueDetail.module.css';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

export default function EpilogueDetail() {
  const router = useRouter();
  const [toggleHeart, setToggleHeart] = useState(false);

  const onToggleHeart = () => {
    setToggleHeart((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 게시판</h2>
        </div>
        <div className={style.content_box}>
          <div>
            <div className={style.title}>
              <span>제목: 제목</span>
              <p>작성자:작성자</p>
            </div>
            <div className={style.content}>
              <p>내용</p>
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
            <span>좋아요 수</span>
          </div>
        </div>
      </div>
    </div>
  );
}
