import Epilogue from '@/src/components/epilogue/Epilogue';

import style from './epilogue.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import { fetchVideo } from '@/pages/api/api';

export default function EpiloguePage() {
  const [token, setToken] = useState();
  const [video, setVideo] = useState();
  const router = useRouter();

  useEffect(() => {
    const setInitData = async () => {
      const response = await fetchVideo(token);
      if (response) {
        console.log(response);
        setVideo(response);
      }
    };
    setToken(localStorage.getItem('loginToken'));

    setInitData();
  }, []);

  const onClickNewEpilogue = () => {
    router.push('/user/epilogue/newepilogue');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>후기 게시판</h2>
        </div>
        <div className={style.new_post}>
          <Button style={{ color: 'black' }} onClick={onClickNewEpilogue}>
            글쓰기
          </Button>
        </div>
        <Epilogue />
      </div>
      <div>
        <a
          href={`http://ceprj.gachon.ac.kr:60011/video/download?videoId=5`}
          download
        >
          Download
        </a>
        <video controls width={'100%'}>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
