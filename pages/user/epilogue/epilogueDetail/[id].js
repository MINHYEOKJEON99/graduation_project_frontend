import EpilogueDetail from '@/src/components/epilogue/EpilogueDetail';
import { useRouter } from 'next/router';

export default function EpilogueDetailPage() {
  const router = useRouter();

  const { id, historyId } = router.query;

  const onClick = () => {
    router.push('/user/epilogue');
  };

  return (
    <>
      <EpilogueDetail id={id} historyId={historyId} onClick={onClick} />
    </>
  );
}
