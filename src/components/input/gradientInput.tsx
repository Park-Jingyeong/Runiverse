// src/components/input/gradientInput.tsx
"use client";
import { useState } from "react";

interface Props {
  value: string[];
  onChange: (selected: number) => void;
}
export default function GradientInput({ value, onChange }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const padding = 20;
    const adjustedWith = rect.width - padding * 2;
    const clickX = e.clientX - rect.left - padding;
    if (clickX < 0 || clickX > adjustedWith) return;
    const sectionWidth = adjustedWith / 2;
    const index = Math.min(2, Math.max(0, Math.round(clickX / sectionWidth)));
    setSelectedIndex(index);
    onChange(index);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full relative cursor-pointer" onClick={handleClick}>
        <div className="rounded-xl bg-gradient-to-r from-[#A7F2FF] via-[#E7A768] to-[#FF2F2F] w-full h-8" />
        <div
          className="absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 transition-all duration-500"
          style={{
            left: `calc(${selectedIndex * 50}% + ${
              selectedIndex === 0 ? 20 : selectedIndex === 2 ? -20 : 0
            }px)`,
          }}
        />
      </div>
      <div className="flex">
        <div className="w-1/3 text-left">{value[0]}</div>
        <div className="w-1/3 text-center">{value[1]}</div>
        <div className="w-1/3 text-right">{value[2]}</div>
      </div>
    </div>
  );
}
