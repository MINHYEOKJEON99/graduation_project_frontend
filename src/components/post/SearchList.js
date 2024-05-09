import { useEffect, useState } from 'react';
import { fetchCommunityTitleSearch } from '@/pages/api/api';
import CommunityPost from './CommunityPost';

export default function SearchList({ q }) {
  const [searchList, setSearchList] = useState();

  useEffect(() => {
    async function setInit() {
      const response = await fetchCommunityTitleSearch(q);
      setSearchList(response.data.content);
    }
    setInit();
  }, [q]);

  return (
    <>
      {searchList &&
        searchList.map((post) => (
          <CommunityPost
            key={post.boardId}
            id={post.boardId}
            title={post.title}
            content={post.content}
            viewCount={post.viewCount}
            commentNum={0}
          />
        ))}
    </>
  );
}
