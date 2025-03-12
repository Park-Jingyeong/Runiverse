// src/components/input/courseInfoInput.tsx
"use client";
import Image from "next/image";
import star_fill_28 from "@/../public/star_fill_28.svg";
import star_empty_28 from "@/../public/star_empty_28.svg";
import GradientInput from "./gradientInput";
import { useState } from "react";

interface Props {
  onChangeSlope: (value: number) => void;
  onChangePavement: (value: number) => void;
  onChangeComplexity: (value: number) => void;
  onChangeToilet: (value: number) => void;
  onChangeParking: (value: number) => void;
}

export default function CourseInfoInput({
  onChangeSlope,
  onChangePavement,
  onChangeComplexity,
  onChangeToilet,
  onChangeParking,
}: Props) {
  const [toilet, setToilet] = useState<number | null>(null);
  const [parking, setParking] = useState<number | null>(null);

  const handleToiletClick = (value: number) => {
    setToilet(value);
    onChangeToilet(value);
  };

  const handleParkingClick = (value: number) => {
    setParking(value);
    onChangeParking(value);
  };
  return (
    <div className="flex flex-col gap-6">
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
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">고도</h2>
        <div>
          <GradientInput
            value={["평지", "완만한 언덕", "가파른 언덕"]}
            onChange={onChangeSlope}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">도로 유형</h2>
        <div>
          <GradientInput
            value={["포장 도로", "혼합", "비포장 도로"]}
            onChange={onChangePavement}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">복잡도</h2>
        <div>
          <GradientInput
            value={["직선 코스", "S자 커브", "다양한 갈래길"]}
            onChange={onChangeComplexity}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">편의 시설</h2>
        <div className="flex justify-between items-center">
          <div>화장실</div>
          <div className="flex gap-2">
            {["있음", "모름", "없음"].map((label, index) => (
              <button
                key={index}
                className={`border-2 rounded-xl w-20 h-[30px] ${
                  toilet === index ? "border-[#4BB7D4]" : ""
                }`}
                onClick={() => handleToiletClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>주차 공간</div>
          <div className="flex gap-2">
            {["있음", "모름", "없음"].map((label, index) => (
              <button
                key={index}
                className={`border-2 rounded-xl w-20 h-[30px] ${
                  parking === index ? "border-[#4BB7D4]" : ""
                }`}
                onClick={() => handleParkingClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
