import style from './Button.module.css';

export default function Button({ onClickButton, children, styles }) {
  return (
    <div
      className={`${style.button} ${style.button2}`}
      style={styles}
      onClick={onClickButton}
    >
      {children}
    </div>
  );
}
