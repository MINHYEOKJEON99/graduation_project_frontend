import Searchbar from '@/src/components/search/Searchbar';
import style from './community.module.css';
import CommunityPost from '@/src/components/post/CommunityPost';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const DUMMY_ARRAY = [
  {
    id: '1',
    title: '벤츠 추천좀요',
    content: '벤츠 뭐탈지 추천좀 해주세요 월급 400입니다.',
    like: 2,
    commentNum: 3,
  },
  {
    id: '2',
    title: '비엠 추천좀요',
    content: '비엠 뭐탈지 추천좀 해주세요 월급 500입니다.',
    like: 5,
    commentNum: 6,
  },
  {
    id: '3',
    title: '아우디 추천좀요',
    content: '아우디 뭐탈지 추천좀 해주세요 월급 400입니다.',
    like: 1,
    commentNum: 6,
  },
];

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
        {DUMMY_ARRAY.map((post) => (
          <CommunityPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            like={post.like}
            commentNum={post.commentNum}
          />
        ))}

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
