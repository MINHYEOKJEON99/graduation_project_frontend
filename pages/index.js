import Image from 'next/image';
import style from './index.module.css';
import backImg from '../src/assets/backImg.jpg';
import { BsFileText } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Epilogue from '@/src/components/epilogue/Epilogue';
import Button from '@/src/components/UI/Button';

export default function MainPage() {
  const router = useRouter();

  const navService = () => {
    router.push('/user/predictservice');
  };

  return (
    <>
      <div className={style.container}>
        <Image
          src={backImg}
          className={style.backImg}
          alt="backgroundImage"
          priority
        />
        <div className={style.main_paragraph}>
          <h1>교통사고 과실비율 측정 AI서비스</h1>
          <p>과실 비율을 측정해주는 AI서비스</p>
          <p>약 20,000개의 영상 데이터를 학습시켜 정확도를 높였습니다</p>
          <Button onClickButton={navService}>측정하기</Button>
        </div>
        {/* 이미지 파일 */}
      </div>
      <div>
        <div className={style.text}>
          <BsFileText size={25} />
          <span style={{ fontWeight: 'bold' }}>후기</span>
        </div>
        <Epilogue />
      </div>
    </>
  );
}
