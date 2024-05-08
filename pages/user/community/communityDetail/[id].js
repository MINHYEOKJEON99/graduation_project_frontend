import { fetchCommunityDetail } from '@/pages/api/api';
import CommunityPostDetail from '@/src/components/post/CommunityPostDetail';
import { postActions } from '@/src/store/post';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CommunityDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [contentDetail, setContentDetail] = useState({});

  const setInitData = useCallback(async () => {
    const response = await fetchCommunityDetail(router.query.id);

    setContentDetail(response.data);
    dispatch(postActions.addPostDetail(contentDetail));
  }, [router]);

  useEffect(() => {
    setInitData();
  }, []);

  return (
    <>
      {contentDetail && (
        <CommunityPostDetail
          key={contentDetail.boardId}
          title={contentDetail.title}
          content={contentDetail.content}
        />
      )}
    </>
  );
}
