// src/components/input/courseInfoInput.tsx
import Image from "next/image";
import star_fill_28 from "@/../public/star_fill_28.svg";
import star_empty_28 from "@/../public/star_empty_28.svg";

export default function CourseInfoInput() {
  return (
    <div className="flex flex-col gap-6">
      {/* 난이도 */}
      <h1 className="text-xl font-bold text-center">
        코스의 난이도는 어땠나요?
      </h1>
      <div className="flex justify-around">
        <button>
          <Image src={star_empty_28} alt="difficulty" />
        </button>
        <button>
          <Image src={star_empty_28} alt="difficulty" />
        </button>
        <button>
          <Image src={star_empty_28} alt="difficulty" />
        </button>
        <button>
          <Image src={star_empty_28} alt="difficulty" />
        </button>
        <button>
          <Image src={star_empty_28} alt="difficulty" />
        </button>
      </div>
      <div>
        <h2 className="text-lg font-bold">고도</h2>
        <div></div>
      </div>
      <div>
        <h2 className="text-lg font-bold">도로 유형</h2>
        <div></div>
      </div>
      <div>
        <h2 className="text-lg font-bold">복잡도</h2>
        <div></div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">편의 시설</h2>
        <div className="flex justify-between items-center">
          <div>화장실</div>
          <div className="flex gap-2">
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              있음
            </button>
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              모름
            </button>
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              없음
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>주차 공간</div>
          <div className="flex gap-2">
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              있음
            </button>
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              모름
            </button>
            <button className="border-2 rounded-xl focus:border-[#4BB7D4] w-20 h-[30px]">
              없음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
