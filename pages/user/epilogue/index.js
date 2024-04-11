import Epilogue from '@/src/components/epilogue/Epilogue';

import style from './epilogue.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

export default function EpiloguePage() {
  const router = useRouter();

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
    </div>
  );
}
