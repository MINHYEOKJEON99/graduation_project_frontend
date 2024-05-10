import { useRouter } from 'next/router';
import style from './InquiryDetail.module.css';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

export default function InquiryDetail({ title, content, writerName }) {
  const router = useRouter();

  const [toggleHeart, setToggleHeart] = useState(false);

  const onToggleHeart = () => {
    setToggleHeart((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>문의하기</h2>
        </div>
        <div className={style.content_box}>
          <div>
            <div className={style.title}>
              <span>제목: {title}</span>
              <p>작성자:{writerName}</p>
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
            {3}
          </div>
        </div>
        <div className={style.answer}>
          <div>답글</div>
          <div className={style.answer_write}></div>
        </div>
        {/* {commentList &&
          commentList.map((comment) => (
            <Comment
              key={comment.commentId}
              boardId={id}
              commentId={comment.commentId}
              commentWriterName={comment.commentWriterName}
              commentWriterEmail={comment.commentWriterEmail}
              content={comment.content}
              createdDate={comment.createdDate}
            />
          ))} */}
      </div>
    </div>
  );
}
