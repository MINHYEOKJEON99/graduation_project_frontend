import SearchList from '@/src/components/post/SearchList';
import style from './search.module.css';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>&ldquo;{q}&rdquo; 의 검색결과</h2>
        </div>

        <SearchList q={q} />
      </div>
    </div>
  );
}
