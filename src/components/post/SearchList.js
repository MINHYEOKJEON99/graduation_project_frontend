import style from './SearchList.module.css';

const DUMMY_ARRAY = [
  {
    id: '1',
    title: '안녕하세요',
    content: '안녕하세요 처음 이용했습니다',
    date: '2024-02-03',
  },
  {
    id: '2',
    title: '하이용',
    content: '안녕하세요 처음 이용했습니다',
    date: '2024-03-03',
  },
  {
    id: '3',
    title: '푸하하',
    content: '안녕하세요 처음 이용했습니다',
    date: '2024-05-03',
  },
  {
    id: '4',
    title: '안뇽',
    content: '안녕하세요 처음 이용했습니다',
    date: '2024-05-04',
  },
];

export default function SearchList({ q }) {
  const searchList = DUMMY_ARRAY.filter((post) => post.title.includes(q));
  console.log(typeof q);
  return (
    <>
      {searchList.map((post) => (
        <div className={style.content_wrapper} key={post.id}>
          <div className={style.content_box}>
            <div className={style.category_detail}>{post.title}</div>
            <div className={style.content}>{post.content}</div>
            <div className={style.date}>
              <div>{post.date}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
