// src/components/loactionPoint.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import add_white_48 from "@/../public/add_white_48.svg";
import remove_white_48 from "@/../public/remove_white_48.svg";

type Waypoint = { id: number; value: string };

export default function LoactionPointInput() {
  // wayInputs -
  const [soInputs, setSOInput] = useState<Waypoint[]>([{ id: 1, value: "" }]);
  const [pointInput, setPointInput] = useState("");

  // 경유지 input 추가
  const addSOInput = () => {
    setSOInput([...soInputs, { id: Date.now(), value: "" }]);
  };
  // 경유지 input 제거
  const removeSOInput = (id: number) => {
    setSOInput(soInputs.filter((stopOver) => stopOver.id !== id));
  };

  // 경유지 StopOver input 값 change
  const handleSOInputChange = (id: number, value: string) => {
    setSOInput(
      soInputs.map((stopOver) =>
        stopOver.id === id ? { ...stopOver, value } : stopOver
      )
    );
  };

  // 출발지 도착지 Point input 값 change
  const handlePointInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput(e.target.value);
  };
  const onClickSearch = (e: React.MouseEvent<HTMLElement>) => {};

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg mb-1">출발지</h2>
        <div className="flex gap-2">
          <input
            onChange={handlePointInputChange}
            placeholder="시작하는 지점을 입력해주세요."
            className="h-[50px] border-2 rounded-xl p-4 flex-1"
          />
          <button
            onClick={onClickSearch}
            className="h-[50px] rounded-xl bg-[#4BB7D4] text-white w-20 font-bold"
          >
            찾기
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg mb-1">도착지</h2>
        <div className="flex gap-2">
          <input
            onChange={handlePointInputChange}
            placeholder="도착하는 지점을 입력해주세요."
            className="h-[50px] border-2 rounded-xl p-4 flex-1"
          />
          <button
            onClick={onClickSearch}
            className="h-[50px] rounded-xl bg-[#4BB7D4] text-white w-20 font-bold"
          >
            찾기
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg mb-1">경유지</h2>
        <div className="flex flex-col gap-2">
          {soInputs.map((stopOver, index) => (
            <div key={stopOver.id} className="flex gap-2">
              <input
                placeholder="경유하는 지점이 있나요?"
                className="h-[50px] border-2 rounded-xl p-4 flex-1"
                onChange={(e) =>
                  handleSOInputChange(stopOver.id, e.target.value)
                }
              />
              {index === 0 ? (
                <button
                  className="rounded-xl bg-[#4BB7D4]"
                  onClick={addSOInput}
                >
                  <Image src={add_white_48} alt="add input" />
                </button>
              ) : (
                <button
                  className="rounded-xl bg-[#4BB7D4]"
                  onClick={() => removeSOInput(stopOver.id)}
                >
                  <Image src={remove_white_48} alt="remove input" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
