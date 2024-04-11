import CustomerCenterTable from '@/src/components/post/CustomerCenterTable';
import style from './customercenter.module.css';

export default function CustomerCenter() {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title_box}>
          <h2>고객센터</h2>
          <div className={style.category_box}>
            <li>FAQ</li>
            <li>공지사항</li>
            <li>문의하기</li>
          </div>
        </div>
      </div>
      <CustomerCenterTable />
    </>
  );
}
