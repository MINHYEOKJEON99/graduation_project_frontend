import Button from '@/src/components/UI/Button';
import style from './index.module.css';
import { CheckAi } from '@/pages/api/api';
import { useState } from 'react';
import { PiSirenFill } from 'react-icons/pi';

export default function Aimanage() {
  const [color, setColor] = useState('black');

  const onClick = async () => {
    const response = await CheckAi();
    if (response) {
      setColor('green');
    } else {
      setColor('red');
    }
  };

  return (
    <>
      <div className={style.box}>
        <p>Ai 서버상태 : </p>
        <PiSirenFill color={color} size={50} />
      </div>
      <div className={style.button_box}>
        <Button onClickButton={onClick}>AI 서버 확인</Button>
      </div>
    </>
  );
}
