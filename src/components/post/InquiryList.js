import style from './InquiryList.module.css';
import { useRouter } from 'next/router';

export default function inquriyList({ InquiryList }) {
  const router = useRouter();

  const onClickDetail = (id) => {
    router.push(`/user/customercenter/inquiryDetail/${id}`);
  };

  return (
    <>
      {InquiryList &&
        InquiryList.map((inquiry) => (
          <div
            key={inquiry.inquiryId}
            onClick={onClickDetail.bind(null, inquiry.inquiryId)}
            className={style.container}
          >
            <div className={style.title}>{inquiry.title}</div>
            <div className={style.contents}>
              {inquiry.contents.slice(0, 35) + '...'}
            </div>
            <div className={style.date}>
              <p>{inquiry.createdDate.slice(0, 10)}</p>
              <p>{inquiry.replied ? '답변완료' : '보류'}</p>
            </div>
          </div>
        ))}
    </>
  );
}
