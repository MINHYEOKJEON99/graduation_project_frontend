import { fetchReviewDelete } from '@/pages/api/api';
import EpilogueDetail from '@/src/components/epilogue/EpilogueDetail';
import { useRouter } from 'next/router';

export default function AdminEpilogueDetail() {
  const router = useRouter();

  const { id, historyId, writerEmail } = router.query;

  const onClick = () => {
    router.push('/admin/epiloguemanage');
  };

  //후기 삭제기능
  // const onClickDelete = async () => {
  //   try {
  //     const token = localStorage.getItem('loginToken');
  //     const confirm = window.confirm('삭제 하시겠습니까?');
  //     if (confirm) {
  //       await fetchReviewDelete(router.query.id, token);

  //       alert('게시글이 삭제되었습니다.');
  //     }
  //     router.push('/admin/epiloguemanage');
  //   } catch (error) {
  //     console.error('게시글 삭제 중 오류가 발생했습니다:', error);
  //     alert('게시글 삭제 중 문제가 발생했습니다.');
  //   }
  // };

  return (
    <>
      <EpilogueDetail
        id={id}
        historyId={historyId}
        onClick={onClick}
        writerEmail={writerEmail}
        admin={true}
      />
    </>
  );
}
