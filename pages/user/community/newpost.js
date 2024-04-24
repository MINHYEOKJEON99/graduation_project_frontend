import { useState } from 'react';
import style from './newpost.module.css';
import { useDispatch } from 'react-redux';
import { postActions } from '@/src/store/post';
import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function Newpost() {
  const dispatch = useDispatch();
  const ref = useRef(3);
  const router = useRouter();
  const [text, setText] = useState({
    title: '',
    content: '',
  });

  const onChangeText = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    dispatch(
      postActions.addPost({
        ...text,
        like: 0,
        commentNum: 0,
        username: '',
      })
    );
    setText({
      title: '',
      content: '',
    });
    router.push('/user/community');
    console.log(text);
  };

  return (
    <form onSubmit={onSubmitPost} className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>글 작성</h2>
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
          글쓰기
        </button>
      </div>
    </form>
  );
}
