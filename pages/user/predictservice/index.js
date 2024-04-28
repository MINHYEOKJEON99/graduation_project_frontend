import Dropdrag from '@/src/components/dropzone/Dropdrag';
import Result from '@/src/components/dropzone/Result';
import { useState } from 'react';

export default function Predictservice() {
  const [isLoading, setIsLoading] = useState(false);

  const onClickResult = (fileName) => {
    if (!fileName) {
      alert('영상 파일을 넣어주세요');
      return;
    }
    setIsLoading(true);
  };

  return <>{isLoading ? <Result /> : <Dropdrag onClick={onClickResult} />}</>;
}
