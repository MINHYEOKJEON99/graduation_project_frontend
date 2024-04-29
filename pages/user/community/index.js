import Searchbar from '@/src/components/search/Searchbar';
import style from './community.module.css';
import CommunityPost from '@/src/components/post/CommunityPost';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// const DUMMY_ARRAY = [
//   {
//     id: '1',
//     title: '벤츠 추천좀요',
//     content: '벤츠 뭐탈지 추천좀 해주세요 월급 400입니다.',
//     like: 2,
//     commentNum: 3,
//   },
//   {
//     id: '2',
//     title: '비엠 추천좀요',
//     content: '비엠 뭐탈지 추천좀 해주세요 월급 500입니다.',
//     like: 5,
//     commentNum: 6,
//   },
//   {
//     id: '3',
//     title: '아우디 추천좀요',
//     content: '아우디 뭐탈지 추천좀 해주세요 월급 400입니다.',
//     like: 1,
//     commentNum: 6,
//   },
// ];

export default function Communty() {
  const router = useRouter();
  const DUMMY_ARRAY = useSelector((state) => state.post);
  const [age, setAge] = useState(0);

  const onClickNewPost = () => {
    router.push('/user/community/newpost');
  };

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>커뮤니티</h2>
        </div>
        <div className={style.search_bar}>
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel id="demo-simple-select-label">검색 옵션</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="검색옵션"
              onChange={handleChange}
              style={{ height: '42px' }}
            >
              <MenuItem value={10}>제목</MenuItem>
              <MenuItem value={20}>작성자</MenuItem>
              <MenuItem value={30}>내용</MenuItem>
            </Select>
          </FormControl>
          <Searchbar />
        </div>
        {DUMMY_ARRAY.map((post) => (
          <CommunityPost
            key={post.id}
            title={post.title}
            content={post.content}
            like={post.like}
            commentNum={post.commentNum}
            username={post.username}
          />
        ))}

        <div className={style.new_post}>
          <Button style={{ color: 'black' }} onClick={onClickNewPost}>
            글쓰기
          </Button>
        </div>
        <div className={style.paging}>
          <p>1</p>
        </div>
      </div>
    </div>
  );
}
