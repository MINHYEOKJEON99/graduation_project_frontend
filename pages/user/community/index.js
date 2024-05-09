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
import { useEffect, useState } from 'react';
import { fetchCommunity } from '@/pages/api/api';

export default function Community() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [age, setAge] = useState(0);
  const [contents, setContents] = useState([]);

  //커뮤니티 리스트 업데이트
  useEffect(() => {
    const setInitData = async () => {
      const { data } = await fetchCommunity();
      setContents(data.content);
    };

    setInitData();
  }, []);

  const onClickNewPost = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }
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
        {contents &&
          contents.map((post) => (
            <CommunityPost
              key={post.boardId}
              id={post.boardId}
              title={post.title}
              content={post.content}
              viewCount={post.viewCount}
              commentNum={0}
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
