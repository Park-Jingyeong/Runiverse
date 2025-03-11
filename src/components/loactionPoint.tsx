// src/components/loactionPoint.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import add_white_48 from "@/../public/add_white_48.svg";
import remove_white_48 from "@/../public/remove_white_48.svg";

type Waypoint = { id: number; value: string };

export default function LocationPoint() {
  const [wayInputs, setWayInput] = useState<Waypoint[]>([{ id: 1, value: "" }]);

  const addWayInput = () => {
    setWayInput([...wayInputs, { id: Date.now(), value: "" }]);
  };
  const removeWayInput = (id: number) => {
    setWayInput(wayInputs.filter((waypoint) => waypoint.id !== id));
  };

  const handleChange = (id: number, value: string) => {
    setWayInput(
      wayInputs.map((waypoint) =>
        waypoint.id === id ? { ...waypoint, value } : waypoint
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg mb-1">출발지</h2>
        <div className="flex gap-2">
          <input
            placeholder="시작하는 지점을 입력해주세요."
            className="h-[50px] border-2 rounded-xl p-4 flex-1"
          />
          <button className="h-[50px] rounded-xl bg-[#4BB7D4] text-white w-20 font-bold">
            찾기
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg mb-1">경유지</h2>
        <div className="flex flex-col gap-2">
          {wayInputs.map((waypoint, index) => (
            <div key={waypoint.id} className="flex gap-2">
              <input
                placeholder="경유하는 지점이 있나요?"
                className="h-[50px] border-2 rounded-xl p-4 flex-1"
                onChange={(e) => handleChange(waypoint.id, e.target.value)}
              />
              {index === 0 ? (
                <button
                  className="rounded-xl bg-[#4BB7D4]"
                  onClick={addWayInput}
                >
                  <Image src={add_white_48} alt="add input" />
                </button>
              ) : (
                <button
                  className="rounded-xl bg-[#4BB7D4]"
                  onClick={() => removeWayInput(waypoint.id)}
                >
                  <Image src={remove_white_48} alt="remove input" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg mb-1">도착지</h2>
        <div className="flex gap-2">
          <input
            placeholder="도착하는 지점을 입력해주세요."
            className="h-[50px] border-2 rounded-xl p-4 flex-1"
          />
          <button className="h-[50px] rounded-xl bg-[#4BB7D4] text-white w-20 font-bold">
            찾기
          </button>
        </div>
      </div>
    </div>
  );
}
