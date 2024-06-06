import ActivityList from '@/src/components/post/ActivityList';
import style from './activity.module.css';
import { useEffect, useState } from 'react';
import {
  fetchMyPageComment,
  fetchMyPageCommunity,
  fetchMypageReview,
} from '@/pages/api/api';
import { useRouter } from 'next/router';
import Paginaition from '@/src/components/UI/Pagination';

export default function Activity() {
  const router = useRouter();

  const [token, setToken] = useState();
  const [activity, setActivity] = useState();
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isValid, setIsValid] = useState({
    community: true,
    comment: false,
    review: false,
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      setToken(localStorage.getItem('loginToken'));

      const response = await fetchMyPageCommunity(token, currentPage - 1);
      if (response) {
        setActivity(response.data.content);
        setTotalPage(response.data.totalPages);
      }
    }
    setInit();
  }, [token, currentPage]);

  const onClickCommunity = async () => {
    const response = await fetchMyPageCommunity(token, currentPage - 1);
    setTotalPage(response.data.totalPages);
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
    const response = await fetchMyPageComment(token, currentPage - 1);
    if (response) {
      setActivity(response.data.content);
      setTotalPage(response.data.totalPages);
      setIsValid({
        community: false,
        comment: true,
        review: false,
      });
    }
  };

  const onClickReview = async () => {
    const response = await fetchMypageReview(token, currentPage - 1);
    if (response) {
      setActivity(response.data.content);
      setTotalPage(response.data.totalPages);
      setIsValid({
        community: false,
        comment: false,
        review: true,
      });
    }
  };

  const onClickReviewDetail = (id, historyId, writerEmail) => {
    router.push({
      pathname: `/user/epilogue/epilogueDetail/${id}`,
      query: {
        historyId: historyId,
        writerEmail: writerEmail,
      },
    });
  };

  const onClickCommunityDetail = (id) => {
    router.push(`/user/community/communityDetail/${id}`);
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
        />
      ));
  } else if (isValid.review) {
    content =
      activity &&
      activity.map((review) => (
        <ActivityList
          onClick={onClickReviewDetail.bind(
            null,
            review.reviewId,
            review.historyId,
            review.writerEmail
          )}
          key={review.reviewId}
          id={review.reviewId}
          title={review.title}
          content={review.content}
          createdDate={review.createdDate}
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
          <div onClick={onClickReview} className={style.middle_menu}>
            작성 후기
          </div>
          <div onClick={onClickComment} className={style.last_menu}>
            작성 댓글
          </div>
        </div>
        {content}
      </div>
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </div>
  );
}
