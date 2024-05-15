import { useEffect, useState } from 'react';
import style from './newpost.module.css';
import { useRouter } from 'next/router';
import { fetchNewPost } from '@/pages/api/api';
import ImageSelect from '@/src/components/dropzone/ImageSelect';

export default function Newpost() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [uploadFunction, setUploadFunction] = useState(() => {});
  const [text, setText] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    console.log(token);
  }, [token]);

  const onChangeText = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const fileUpload = (upload) => {
    upload();
  };

  const onSubmitPost = async (e) => {
    if (text.title === '' || text.content === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    e.preventDefault();

    const isSuccess = await fetchNewPost(text, token);
    if (isSuccess) {
      uploadFunction();
      alert('새 글이 게시되었습니다.');
      router.push('/user/community');
      console.log(text);
    } else {
      console.error('에러');
    }
  };

  return (
    <form onSubmit={onSubmitPost} className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>글 작성</h2>
        </div>
        <ImageSelect setUploadFunction={setUploadFunction} />

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
          글쓰기
        </button>
      </div>
    </form>
  );
}
