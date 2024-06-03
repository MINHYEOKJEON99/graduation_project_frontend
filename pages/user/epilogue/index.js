import Epilogue from '@/src/components/epilogue/Epilogue';

import style from './epilogue.module.css';
import { useRouter } from 'next/router';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import { useEffect, useState } from 'react';
import { fetchReview } from '@/pages/api/api';
import Paginaition from '@/src/components/UI/Pagination';

const actions = [{ icon: <DrawTwoToneIcon />, name: '후기 작성' }];

export default function EpiloguePage() {
  const [token, setToken] = useState();

  const [review, setReview] = useState([]);
  const router = useRouter();

  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPosts, setCurrentPosts] = useState([]);

  //페이지 넘버를 계산하기 위한 상수 설정 props로 pagination컴포넌트로 넘겨준다.
  // const postsPerPage = 6;

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchReview(currentPage - 1);
      if (response) {
        setReview(response.data.content);
        setTotalPage(response.data.totalPages);
      }
    };
    setToken(localStorage.getItem('loginToken'));

    setInitData();
  }, [currentPage]);

  // useEffect(() => {
  //   if (review) {
  //     setCurrentPosts(review.slice(indexOfFirstPost, indexOfLastPost));
  //   }
  // }, [currentPage, review]);

  const onClickNewEpilogue = () => {
    router.push('/user/epilogue/newepilogue');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 게시판</h2>
          {/* <a
            href="http://ceprj.gachon.ac.kr:60011/history/download?historyId=3"
            download
          >
            다운로드
          </a> */}
        </div>
        <div className={style.new_post}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 30, right: 30 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={onClickNewEpilogue}
              />
            ))}
          </SpeedDial>
        </div>
        <div className={style.review_box}>
          {review &&
            review.map((review) => (
              <Epilogue
                key={review.reviewId}
                historyId={review.historyId}
                id={review.reviewId}
                title={review.title}
                content={review.content.slice(0, 40)}
                writerEmail={review.writerEmail}
                viewCount={review.viewCount}
              />
            ))}
        </div>
        <div className={style.paging}>
          <Paginaition totalPage={totalPage} paginate={paginate} />
        </div>
      </div>
    </div>
  );
}
