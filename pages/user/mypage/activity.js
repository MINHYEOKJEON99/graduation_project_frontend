import ActivityList from '@/src/components/post/ActivityList';
import style from './activity.module.css';
import { useEffect, useState } from 'react';
import {
  fetchMyPageComment,
  fetchMyPageCommentDelete,
  fetchMyPageCommunity,
  fetchMyPageCommunityDelete,
} from '@/pages/api/api';
import { useRouter } from 'next/router';

export default function Activity() {
  const router = useRouter();

  const [token, setToken] = useState();
  const [activity, setActivity] = useState();
  const [isValid, setIsValid] = useState({
    community: true,
    comment: false,
    review: false,
  });

  useEffect(() => {
    async function setInit() {
      setToken(localStorage.getItem('loginToken'));

      const response = await fetchMyPageCommunity(token);
      if (response) {
        setActivity(response.data.content);
      }
    }
    setInit();
  }, [token]);

  const onClickCommunity = async () => {
    const response = await fetchMyPageCommunity(token);
    if (response) {
      setActivity(response.data.content);
      setIsValid({
        community: true,
        comment: false,
        review: false,
      });
    }
  };

  const onClickComment = async () => {
    const response = await fetchMyPageComment(token);
    if (response) {
      setActivity(response.data.content);
      setIsValid({
        community: false,
        comment: true,
        review: false,
      });
    }
  };

  const onClickCommunityDetail = (id) => {
    router.push(`/user/community/communityDetail/${id}`);
  };

  const onClickCommunityDelete = async (id, token) => {
    try {
      const confirm = window.confirm('게시물을 삭제하시겠습니까?');
      if (confirm) {
        await fetchMyPageCommunityDelete(id, token);
        alert('게시물이 삭제되었습니다.');
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCommentDelete = async (id, token) => {
    try {
      const confirm = window.confirm('게시물을 삭제하시겠습니까?');
      if (confirm) {
        await fetchMyPageCommentDelete(id, token);
        alert('게시물이 삭제되었습니다.');
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  //조건부 렌더링 선언
  let content;

  if (isValid.community) {
    content =
      activity &&
      activity.map((post) => (
        <ActivityList
          onClick={onClickCommunityDetail.bind(null, post.boardId)}
          key={post.boardId}
          id={post.boardId}
          title={post.title}
          content={post.content}
          createdDate={post.createdDate}
          onDelete={onClickCommunityDelete}
        />
      ));
  } else if (isValid.comment) {
    content =
      activity &&
      activity.map((comment) => (
        <ActivityList
          key={comment.commentId}
          id={comment.commentId}
          content={comment.content}
          createdDate={comment.createdDate}
          onDelete={onClickCommentDelete}
        />
      ));
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>활동 내역</h2>
        </div>
        <div className={style.category_box}>
          <div onClick={onClickCommunity} className={style.first_menu}>
            작성 글
          </div>
          <div className={style.middle_menu}>작성 후기</div>
          <div onClick={onClickComment} className={style.last_menu}>
            작성 댓글
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}
