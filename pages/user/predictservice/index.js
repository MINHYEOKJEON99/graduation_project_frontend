import Dropdrag from '@/src/components/dropzone/Dropdrag';
import Result from '@/src/components/dropzone/Result';
import { useState } from 'react';

export default function Predictservice() {
  const [isLoading, setIsLoading] = useState(false);

  const onClickResult = () => {
    setIsLoading(true);
  };

  return <>{isLoading ? <Result /> : <Dropdrag onClick={onClickResult} />}</>;
}
