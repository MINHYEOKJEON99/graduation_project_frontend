import style from './UserSubLayout.module.css';

export default function UserSubLayout({ children }) {
  return (
    <div>
      <div className={style.main}>{children}</div>
      <footer className={style.footer}>@Gachon University</footer>
    </div>
  );
}
