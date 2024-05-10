import { useEffect, useState } from 'react';
import style from './inquiry.module.css';
import { useRouter } from 'next/router';
import { fetchInquireWrite } from '@/pages/api/api';

export default function Inquiry() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [text, setText] = useState({
    title: '',
    contents: '',
  });

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const onChangeText = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const onSubmitPost = async (e) => {
    if (text.title === '' || text.contents === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    e.preventDefault();
    const isSuccess = await fetchInquireWrite(text, token);
    if (isSuccess) {
      alert('새 글이 게시되었습니다.');
      router.push('/user/customercenter');
      console.log(text);
    } else {
      console.error('에러');
    }
  };

  return (
    <form onSubmit={onSubmitPost} className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>문의하기</h2>
        </div>
        <div className={style.content_box}>
          <div className={style.title}>
            <span>제목: </span>
            <textarea
              name="title"
              onChange={onChangeText}
              className={style.title_post}
              value={text.title}
            />
          </div>
          <textarea
            name="contents"
            className={style.content}
            onChange={onChangeText}
            value={text.contents}
          />
        </div>
      </div>
      <div className={style.new_post}>
        <button type="submit" className={style.button}>
          문의하기
        </button>
      </div>
    </form>
  );
}
