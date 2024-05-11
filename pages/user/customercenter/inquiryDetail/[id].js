import { fetchInquiryDetail } from '@/pages/api/api';
import InquiryDetail from '@/src/components/post/InquiryDetail';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function InquiryDetailPage() {
  const router = useRouter();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const [contentDetail, setContentDetail] = useState({});

  //커뮤니티 상세정보 업데이트
  const setInitData = useCallback(async () => {
    const response = await fetchInquiryDetail(router.query.id, token);

    if (response) {
      setContentDetail(response.data);
    }
  }, [router.query.id]);

  useEffect(() => {
    setInitData();
    console.log(contentDetail);
  }, [setInitData]);

  return (
    <>
      {contentDetail && (
        <InquiryDetail
          key={contentDetail.inquiryId}
          title={contentDetail.title}
          content={contentDetail.contents}
          writerName={contentDetail.writerName}
        />
      )}
    </>
  );
}
