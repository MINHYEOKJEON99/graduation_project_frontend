import style from './communityDetail.module.css';

export default function CommunityDetail() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.box}>
          <h2>커뮤니티 게시판</h2>
        </div>
        <div className={style.content_box}>
          <div className={style.title}>
            제목: <span>교통 사고 과실 몇 나올까요?</span>
          </div>
          <div className={style.content}>
            <p>뒤에서 박았는데 트렁크 완전 박살 났어요 ㅠㅠ</p>
          </div>
          <div className={style.like}>좋아요</div>
        </div>
        <div className={style.answer}>
          <div>답글</div>
        </div>
      </div>
    </div>
  );
}
