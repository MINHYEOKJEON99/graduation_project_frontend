import Image from 'next/image';
import style from './index.module.css';
import backImg from '../src/assets/backImg.jpg';
import Epilogue from '@/src/components/epilogue/Epilogue';
import Button from '@/src/components/UI/Button';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import reviewImg from '../src/assets/review.png';
import communityImg from '../src/assets/community.png';
import aiImg from '../src/assets/ai.png';

import { BsFileText } from 'react-icons/bs';
import { useRouter } from 'next/router';

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
      <div className={style.core_service}>
        <div className={style.core_service_box}>
          <NewReleasesOutlinedIcon fontSize="30px" />
          <span>주요 서비스</span>
        </div>
      </div>
      <div className={style.img_box}>
        <div>
          <Image src={aiImg} alt="ai이미지" className={style.Img} />
          <h2>ai 서비스</h2>
          <p>ai를 통하여 교통사고</p>
          <p>영상과실비율 측정</p>
          <p>가능합니다</p>
        </div>
        <div>
          <Image src={communityImg} alt="커뮤니티" className={style.Img} />
          <h2>커뮤니티 서비스</h2>
          <p>커뮤니티 서비스를 통하여</p>
          <p>사용자 간 소통을 할 수 있습니다</p>
        </div>
        <div>
          <Image src={reviewImg} alt="리뷰" className={style.Img} />
          <h2>후기서비스</h2>
          <p>후기 서비스의 데이터를 이용</p>
          <p>하여 ai 정확성을 향상 시킬 수</p>
          <p>있습니다.</p>
        </div>
      </div>
      <div>
        <div className={style.text}>
          <BsFileText size={30} />
          <span style={{ fontWeight: 'bold' }}>후기</span>
        </div>
        <Epilogue />
      </div>
    </>
  );
}
