export default function Page() {
  return (
    <div>
      <section>
        {/* 설정 - 프로필 관리 / 고객센터 dropdown */}
        <button>설정 버튼</button>
        <div>프로필 이미지</div>
        <div>닉네임</div>
        <div>기록</div>
      </section>
      <section>
        <div>
          {/* 컴포넌트로 구현 */}
          <div>컴포넌트 구현</div>
          <button>나의 코스</button>
          <button>별점</button>
          <button>즐겨찾기</button>
        </div>
      </section>
    </div>
  );
}
