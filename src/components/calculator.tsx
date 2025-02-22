// src/components/calculator.tsx
"use client";
import { useState } from "react";

export default function Calculator({ distance }: { distance: number }) {
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(0);

  const totalMinutes = Math.round((minute + second / 60) * distance);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;
  return (
    <div className="leading-[50px]">
      1km를 {""}
      <select
        className="border-[1px] border-[#D8D8D8] w-20 h-10 rounded-xl p-2"
        value={minute}
        onChange={(e) => setMinute(Number(e.target.value))}
      >
        {[...Array(13)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {""} 분 {""}
      <select
        className="border-[1px] border-[#D8D8D8] w-20 h-10 rounded-xl p-2"
        value={second}
        onChange={(e) => setSecond(Number(e.target.value))}
      >
        {[0, 10, 20, 30, 40, 50].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      {""} 초로 뛰었을 때,
      <div className="flex gap-2 items-center">
        약
        <p className="border-[1px] border-[#D8D8D8] w-[120px] h-10 rounded-xl p-2 flex items-center justify-end font-bold">
          {hours}시간 {minutes}분
        </p>
        걸려요
      </div>
    </div>
  );
}
