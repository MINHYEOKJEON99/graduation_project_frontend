import Searchbar from '@/src/components/search/Searchbar';
import style from './community.module.css';
import CommunityPost from '@/src/components/post/CommunityPost';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

export default function Communty() {
  const router = useRouter();

  const onClickNewPost = () => {
    router.push('/user/community/newpost');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>커뮤니티</h2>
        </div>
        <div className={style.search_bar}>
          <Searchbar />
        </div>
        <CommunityPost />
        <CommunityPost />
        <CommunityPost />
        <CommunityPost />
        <div className={style.new_post}>
          <Button style={{ color: 'black' }} onClick={onClickNewPost}>
            글쓰기
          </Button>
        </div>
        <div className={style.paging}>
          <p>1 2 3</p>
        </div>
      </div>
    </div>
  );
}
