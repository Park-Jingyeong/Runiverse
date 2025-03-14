// index

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Link href={"/new"}>
        <button className="text-lg bg-[#4BB7D4] text-white rounded-lg p-2">임시 코스 등록 버튼</button>
      </Link>
      <section>
        <h1 className="bold text-xl">Slider Section</h1>
        <div>course component</div>
      </section>
      <section>
        <button className="bg-[#4BB7D4] w-80 h-10 rounded-lg text-white">
          오늘의 러닝 코스 추천받기
        </button>
      </section>
      <section>
        <div className="flex justify-between">
          <h1 className="bold text-xl">추천 많은 코스</h1>
          <button>더보기</button>
        </div>
        <div className="flex flex-col gap-3">
          <div>course component 1</div>
          <div>course component 2</div>
          <div>course component 3</div>
        </div>
      </section>
      <section>
        <h1 className="bold text-xl">지역별 추천 코스</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <button>city - link</button>
            <button>city - link</button>
          </div>
          <div className="flex justify-between">
            <button>city - link</button>
            <button>city - link</button>
          </div>
        </div>
      </section>
    </div>
  );
}
