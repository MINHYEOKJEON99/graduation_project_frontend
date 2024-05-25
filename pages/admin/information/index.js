import Announcement from '@/src/components/post/Announcement';
import {
  fetchInformation,
  fetchInformationDelete,
  fetchWriteInformation,
} from '@/pages/api/api';
import style from './index.module.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import Modal from '@/src/components/UI/Modal';
import { useRouter } from 'next/router';

export default function Information() {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [information, setInformation] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      const response = await fetchInformation(token);

      if (response) {
        setInformation(response.data.content);
      }
    };
    setInit();
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClickButton = () => {
    setToggle(true);
  };

  const onDelete = async (id) => {
    const inforDelete = confirm('해당 게시글을 삭제하시겠습니까?');
    if (inforDelete) {
      await fetchInformationDelete(id);
      alert('삭제되었습니다.');
      router.push('/admin');
    }
  };

  const onSubmit = async () => {
    const token = localStorage.getItem('loginToken');

    const response = await fetchWriteInformation(
      { title: title, content: content },
      token
    );

    if (response) {
      alert('공지사항이 게시되었습니다.');
      setToggle(false);
      router.push('/admin');
    }
  };
  const onClose = () => {
    setToggle(false);
  };

  return (
    <div className={style.box}>
      {toggle && (
        <Modal>
          <div className={style.wrtie_box}>
            <textarea
              placeholder="제목을 입력해주세요"
              onChange={onChangeTitle}
              className={style.write_title}
              value={title}
            />
            <textarea
              placeholder="공지내용을 입력해주세요"
              onChange={onChangeContent}
              className={style.write_content}
              value={content}
            />
          </div>
          <div className={style.modal_button}>
            <Button onClick={onSubmit}>작성</Button>
            <Button onClick={onClose}>닫기</Button>
          </div>
        </Modal>
      )}
      <div className={style.button_box}>
        <Button onClick={onClickButton}>공지사항 작성</Button>
      </div>

      {information &&
        information.map((post) => (
          <>
            <Announcement
              key={post.noticeId}
              id={post.noticeId}
              title={post.title}
              content={post.content}
            />
            <Button onClick={onDelete.bind(null, post.noticeId)}>삭제</Button>
          </>
        ))}
    </div>
  );
}
