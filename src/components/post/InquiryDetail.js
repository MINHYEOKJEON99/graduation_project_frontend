import { useRouter } from 'next/router';
import style from './InquiryDetail.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { fetchAdminInquiryanswer } from '@/pages/api/api';

export default function InquiryDetail({ title, content, writerName }) {
  const router = useRouter();

  const [answer, setAnswer] = useState(false);
  const [text, setText] = useState({
    answer: '',
  });

  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);

  const onClickAnswer = () => {
    setAnswer((prev) => !prev);
  };

  const onChangeAnswer = (e) => {
    setText({
      answer: e.target.value,
    });
  };

  const onSubmitAnswer = () => {
    const token = localStorage.getItem('loginToken');
    const id = router.query.id;
    fetchAdminInquiryanswer(id, text, token);

    alert('문의답변이 등록되었습니다.');
    router.push('/admin/customerservice');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>{isAdmin ? '문의 상세보기' : '문의하기'}</h2>
        </div>
        <div className={isAdmin ? style.admin_content_box : style.content_box}>
          <div>
            <div className={style.title}>
              <span>제목: {title}</span>
              <p>작성자:{writerName}</p>
            </div>
            <div className={style.content}>
              <p>{content}</p>
            </div>
          </div>
        </div>
        {isAdmin ? (
          <div className={style.answer}>
            {answer && (
              <>
                <textarea
                  className={style.textarea}
                  placeholder="문의에 대한 답변을 작성해주세요."
                  onChange={onChangeAnswer}
                  value={text.answer}
                />
                <Button onClick={onSubmitAnswer}>답변달기</Button>
              </>
            )}
            <Button onClick={onClickAnswer}>
              {answer ? '닫기' : '답변하기'}
            </Button>
          </div>
        ) : (
          <div className={style.answer}>
            <div>답글</div>
            <div className={style.answer_write}></div>
          </div>
        )}
      </div>
    </div>
  );
}
