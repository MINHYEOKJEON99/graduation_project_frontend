import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

import style from './Searchbar.module.css';

export default function Searchbar({ q }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

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
      router.push(`/search?q=${search}`);
    }
    setSearch('');
  };

  return (
    <div className={style.container}>
      <BiSearch size={40} color="black" />
      <input
        value={search || ''}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder="검색"
      />
    </div>
  );
}
