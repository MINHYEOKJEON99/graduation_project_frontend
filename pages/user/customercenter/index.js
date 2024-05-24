import CustomerCenterTable from '@/src/components/post/CustomerCenterTable';
import style from './customercenter.module.css';
import { useEffect, useState } from 'react';
import { fetchInquire } from '@/pages/api/api';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Faq from '@/src/components/post/Faq';
import Announcement from '@/src/components/post/Announcement';

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

const ANNOUNCEMENT_DATA = [
  {
    id: '1',
    title: '후기 작성 이벤트 !',
    content: `서비스를 이용후에 후기를 작성하신 사용자님중 
      추첨을 통해 스타벅스 기프티콘을 드립니다.`,
  },
];

export default function CustomerCenter() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [isValue, setIsValue] = useState({
    inquiry: true,
    faq: false,
    announcement: false,
  });
  const [list, setList] = useState();

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

  let content = <CustomerCenterTable inquriyList={list} />;

  if (isValue.inquiry) {
    content = <CustomerCenterTable inquriyList={list} />;

    title = '문의글';
  } else if (isValue.faq) {
    content = FAQ_DATA.map((faq) => (
      <Faq key={faq.id} title={faq.title} content={faq.content} />
    ));

    title = 'FAQ';
  } else {
    title = '공지사항';
    content = ANNOUNCEMENT_DATA.map((announcement) => (
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
        <div className={style.title_box}>
          <h2>{title}</h2>
          <div className={style.category_box}>
            <li onClick={onClickInquiryList}>문의글</li>
            <li onClick={onClickFaq}>FAQ</li>
            <li onClick={onClickAnnounce}>공지사항</li>
            <li onClick={onClickInquiry}>문의하기</li>
          </div>
        </div>
      </div>
      {content}
    </>
  );
}
