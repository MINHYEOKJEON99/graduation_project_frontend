import Searchbar from '@/src/components/search/Searchbar';
import style from './community.module.css';
import CommunityPost from '@/src/components/post/CommunityPost';
import { useRouter } from 'next/router';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCommunity } from '@/pages/api/api';
import Paginaition from '@/src/components/UI/Pagination';

const actions = [{ icon: <DrawTwoToneIcon />, name: '글쓰기' }];

export default function Community() {
  const router = useRouter();
  const isLogin = useSelector((state) => state.auth.isUserAuthenticated);

  const [contents, setContents] = useState([]);
  const [value, setValue] = useState('title');
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPosts, setCurrentPosts] = useState([]);

  // //페이지 넘버를 계산하기 위한 상수 설정 props로 pagination컴포넌트로 넘겨준다.
  // const postsPerPage = 5;

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // // const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //커뮤니티 리스트 업데이트
  useEffect(() => {
    const setInitData = async () => {
      const { data } = await fetchCommunity(currentPage - 1);
      setContents(data.content);
      setTotalPage(data.totalPages);
    };

    setInitData();
  }, [currentPage]);

  // useEffect(() => {
  //   if (contents) {
  //     setCurrentPosts(contents.slice(indexOfFirstPost, indexOfLastPost));
  //   }
  // }, [currentPage, contents]);

  const onClickNewPost = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }
    router.push('/user/community/newpost');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
              value={value}
              label="검색옵션"
              onChange={handleChange}
              style={{ height: '42px' }}
            >
              <MenuItem value={'title'}>제목</MenuItem>
              <MenuItem value={'writer'}>작성자</MenuItem>
              <MenuItem value={'content'}>내용</MenuItem>
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
            />
          ))}

        {/* <div className={style.new_post}>
          <Button style={{ color: 'black' }} onClick={onClickNewPost}>
            글쓰기
          </Button>
        </div> */}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 30, right: 30 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={onClickNewPost}
            />
          ))}
        </SpeedDial>
        <div className={style.paging}>
          <Paginaition totalPage={totalPage} paginate={paginate} />
        </div>
      </div>
    </div>
  );
}
