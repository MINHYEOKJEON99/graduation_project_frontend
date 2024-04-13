import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

import style from './Searchbar.module.css';

export default function Searchbar({ q }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (router.pathname.includes('admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    if (search !== '') {
      router.push(`/user/search?q=${search}`);
    }
    setSearch('');
  };

  let content = !isAdmin ? (
    <div className={style.container}>
      <BiSearch size={40} color="black" />
      <input
        value={search || ''}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder="검색"
      />
    </div>
  ) : (
    <div className={style.search_container}>
      <input
        type="text"
        placeholder="Search for..."
        className={style.search_input}
      />
      <button className={style.search_button}>
        <svg
          className={style.search_icon}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z"></path>
        </svg>
      </button>
    </div>
  );

  return <>{content}</>;
}
