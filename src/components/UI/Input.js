import style from './Input.module.css';

export default function Input({
  name,
  type,
  placeholder,
  onChange,
  value,
  disabled,
  styled,
  readOnly,
}) {
  return (
    <div className={style.textForm}>
      <input
        className={style.value}
        name={name}
        type={type}
        style={styled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}
