import { useCallback, useEffect, useState } from 'react';
import style from './[id].module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchUpdatePost } from '@/pages/api/api';

export default function UpdatePost() {
  const router = useRouter();
  const postDetail = useSelector((state) => state.post);

  const { id } = router.query;

  const [token, setToken] = useState();
  const [text, setText] = useState({
    title: postDetail.title,
    content: postDetail.content,
  });

  //토큰 저장
  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const onChangeText = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const onSubmitPost = async (e) => {
    e.preventDefault();
    const isSuccess = await fetchUpdatePost(id, text, token);
    if (isSuccess) {
      alert('글이 수정되었습니다.');
      router.push(`/user/community/communityDetail/${id}`);
      console.log(text);
    } else {
      console.error('에러');
    }
  };

  return (
    <form onSubmit={onSubmitPost} className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>글 수정</h2>
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
            name="content"
            className={style.content}
            onChange={onChangeText}
            value={text.content}
          />
        </div>
      </div>
      <div className={style.new_post}>
        <button type="submit" className={style.button}>
          수정하기
        </button>
      </div>
    </form>
  );
}
