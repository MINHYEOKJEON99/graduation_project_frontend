import style from './customercenter.module.css';
import { useEffect, useState } from 'react';
import { fetchInformation, fetchInquire } from '@/pages/api/api';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Faq from '@/src/components/post/Faq';
import Announcement from '@/src/components/post/Announcement';
import InquiryList from '@/src/components/post/InquiryList';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import Paginaition from '@/src/components/UI/Pagination';
const FAQ_DATA = [
  {
    id: '1',
    title: '로그인을 해야 과실비율 측정이 되나요?',
    content:
      '아니요 측정은 진행되지만 로그인을 하지않으면 후기작성, 기록이 남지않습니다 ',
  },
  {
    id: '2',
    title: '어느정도로 과실비율이 정확한건가요?',
    content:
      '실제 과실비율과 정확성 일치는 80-90% 정도로 측정이 되고 있습니다. 하지만 법적효력이 있는건 아니니 참고용으로 사용하시면 좋을거같습니다.',
  },
];

const actions = [{ icon: <DrawTwoToneIcon />, name: '문의하기' }];

export default function CustomerCenter() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [isValue, setIsValue] = useState({
    inquiry: true,
    faq: false,
    announcement: false,
  });
  const [list, setList] = useState([]);
  const [announce, setAnnounce] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);

  //페이지 넘버를 계산하기 위한 상수 설정 props로 pagination컴포넌트로 넘겨준다.
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function setInit() {
      const response = await fetchInformation();
      if (response) {
        setAnnounce(response.data.content);
      }
    }
    setInit();
  }, []);

  useEffect(() => {
    async function setInit() {
      const response = await fetchInquire();
      if (response) {
        setList(response.data.content);
      }
    }
    setInit();
    console.log(list);
  }, []);

  useEffect(() => {
    if (list) {
      setCurrentPosts(list.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [currentPage, list]);

  const onClickInquiry = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다');
      router.push('/login');
    } else {
      router.push('/user/customercenter/inquirywrite');
    }
  };

  const onClickInquiryList = () => {
    setIsValue({
      inquiry: true,
      faq: false,
      announcement: false,
    });
  };

  const onClickFaq = () => {
    setIsValue({
      inquiry: false,
      faq: true,
      announcement: false,
    });
  };

  const onClickAnnounce = () => {
    setIsValue({
      inquiry: false,
      faq: false,
      announcement: true,
    });
  };

  let title = '고객센터';

  let content = <InquiryList InquiryList={currentPosts} />;

  if (isValue.inquiry) {
    content = <InquiryList InquiryList={currentPosts} />;

    title = '문의글';
  } else if (isValue.faq) {
    content = FAQ_DATA.map((faq) => (
      <Faq key={faq.id} title={faq.title} content={faq.content} />
    ));

    title = 'FAQ';
  } else {
    title = '공지사항';
    content = announce.map((announcement) => (
      <Announcement
        key={announcement.id}
        id={announcement.id}
        title={announcement.title}
        content={announcement.content}
      />
    ));
  }

  return (
    <>
      <div className={style.wrapper}>
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
              onClick={onClickInquiry}
            />
          ))}
        </SpeedDial>
        <div className={style.title_box}>
          <h2>{title}</h2>
          <div className={style.category_box}>
            <li onClick={onClickInquiryList}>문의글</li>
            <li onClick={onClickFaq}>FAQ</li>
            <li onClick={onClickAnnounce}>공지사항</li>
          </div>
        </div>
      </div>
      {content}
      {isValue.inquiry && (
        <Paginaition
          postsPerPage={postsPerPage}
          totalPosts={list.length}
          paginate={paginate}
        />
      )}
    </>
  );
}
