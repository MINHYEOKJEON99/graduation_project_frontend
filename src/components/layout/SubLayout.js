import style from './SubLayout.module.css';

export default function SubLayout({ children }) {
  return (
    <div>
      <div className={style.main}>{children}</div>
      <footer className={style.footer}>@Gachon University mdmProject</footer>
    </div>
  );
}
