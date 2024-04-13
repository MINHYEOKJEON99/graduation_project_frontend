import style from './Card.module.css';

export default function Card({ children, styled }) {
  return <div className={`${style.container} ${styled}`}>{children}</div>;
}
