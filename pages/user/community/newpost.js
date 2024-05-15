import { useEffect, useState } from 'react';
import style from './newpost.module.css';
import { useRouter } from 'next/router';
import { fetchNewPost } from '@/pages/api/api';
import { fetchCommunityFileUpload } from '@/pages/api/api';
import ImageSelect from '@/src/components/dropzone/ImageSelect';

export default function Newpost() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [formData, setFormData] = useState(null);
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

  const onUpload = (formData) => {
    setFormData(formData);
  };

  const onSubmitPost = async (e) => {
    if (text.title === '' || text.content === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    e.preventDefault();

    const isSuccess = await fetchNewPost(text, token);
    if (isSuccess) {
      if (formData) {
        await fetchCommunityFileUpload(formData, token, isSuccess.data.boardId);
      }
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
        <ImageSelect onFileUpload={onUpload} />

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
