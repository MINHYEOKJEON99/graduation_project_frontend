import { useRouter } from 'next/router';
import style from './CommunityPostDetail.module.css';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { fetchComment, fetchWriteComment } from '@/pages/api/api';
import Comment from './Comment';
import { useSelector } from 'react-redux';

export default function CommunityPostDetail({
  title,
  content,
  like,
  writerName,
  writerEmail,
  onClickDelete,
}) {
  const router = useRouter();
  const { id } = router.query;
  const userLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [toggleHeart, setToggleHeart] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [token, setToken] = useState();
  const [commentList, setCommentList] = useState();
  const [commentListLength, setCommentListLength] = useState();
  const [comment, setComment] = useState({
    content: '',
  });

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchComment(id);
      if (response) {
        setCommentList(response.data.content);
        setCommentListLength(response.data.totalElements);
      }
    };

    setInitData();
  }, [id]);

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    setIsValid(localStorage.getItem('currentEmail') === writerEmail);
    console.log(token);
    console.log(isValid);
  }, [token]);

  const onClickCommunity = () => {
    router.push('/user/community');
  };

  const onToggleHeart = () => {
    setToggleHeart((prev) => !prev);
  };

  const onClickUpdate = () => {
    router.push(`/user/community/updateCommunity/${id}`);
  };

  const onClickCommentWrite = () => {
    if (!userLogin) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }
    if (comment.content.trim().length !== '') {
      fetchWriteComment(id, comment, token);
      alert('댓글이 작성되었습니다.');
      location.reload();
    } else {
      alert('댓글을 입력해주세요.');
    }
  };

  const onChangeComment = (e) => {
    setComment({ content: e.target.value });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div onClick={onClickCommunity} className={style.box}>
          <h2>커뮤니티 게시판</h2>
        </div>
        {isValid && (
          <div className={style.button_box}>
            <Button onClick={onClickUpdate}>수정하기</Button>
            <Button onClick={onClickDelete}>삭제하기</Button>
          </div>
        )}
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
            {like}
          </div>
        </div>
        <div className={style.answer}>
          <div>{commentListLength}개 댓글</div>
          <div className={style.answer_write}>
            <textarea
              placeholder={
                userLogin ? '댓글을 작성해주세요' : '로그인이 필요합니다.'
              }
              onChange={onChangeComment}
              value={comment.content}
              disabled={userLogin ? false : true}
            />
            <Button onClick={onClickCommentWrite}>작성</Button>
          </div>
        </div>
        {commentList &&
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
          ))}
      </div>
    </div>
  );
}
