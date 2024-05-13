import { fetchCommunityDelete, fetchCommunityDetail } from '@/pages/api/api';
import CommunityPostDetail from '@/src/components/post/CommunityPostDetail';
import { postActions } from '@/src/store/post';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CommunityDetail() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [contentDetail, setContentDetail] = useState({});

  //커뮤니티 상세정보 업데이트
  const setInitData = useCallback(async () => {
    const response = await fetchCommunityDetail(router.query.id);

    if (response) {
      setContentDetail(response.data);
    }
  }, [router.query.id]);

  useEffect(() => {
    setInitData();
  }, [setInitData]);

  useEffect(() => {
    if (contentDetail.boardId) {
      dispatch(postActions.addPostDetail(contentDetail));
    }
  }, [contentDetail, dispatch]);

  //커뮤니티 게시글 삭제기능
  const onClickDelete = async () => {
    try {
      const confirm = window.confirm('삭제 하시겠습니까?');
      if (confirm) {
        await fetchCommunityDelete(router.query.id);

        alert('게시글이 삭제되었습니다.');
      }
      router.push('/user/community');
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      alert('게시글 삭제 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      {contentDetail && (
        <CommunityPostDetail
          key={contentDetail.boardId}
          title={contentDetail.title}
          content={contentDetail.content}
          writerName={contentDetail.writerName}
          writerEmail={contentDetail.writerEmail}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
}
