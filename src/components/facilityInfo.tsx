interface Facility {
  toilet: number;
  parking: number;
}

const value = ["있음", "모름", "없음"];
const borderColor = {
  blue: "w-28 h-8 border-2 border-[#4BB7D4] rounded-xl text-center content-center",
  none: "w-28 h-8 border-2 rounded-xl text-center content-center",
};

export default function FacilityInfo({ toilet, parking }: Facility) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">편의 시설</h2>
      <div className="flex justify-between items-center">
        <h3>화장실</h3>
        <div className="flex gap-2">
          <div
            className={`${toilet === 0 ? borderColor.blue : borderColor.none}`}
          >
            {value[0]}
          </div>
          <div
            className={`${toilet === 1 ? borderColor.blue : borderColor.none}`}
          >
            {value[1]}
          </div>
          <div
            className={`${toilet === 2 ? borderColor.blue : borderColor.none}`}
          >
            {value[2]}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h3>주차 공간</h3>
        <div className="flex gap-2">
          <div
            className={`${parking === 0 ? borderColor.blue : borderColor.none}`}
          >
            {value[0]}
          </div>
          <div
            className={`${parking === 1 ? borderColor.blue : borderColor.none}`}
          >
            {value[1]}
          </div>
          <div
            className={`${parking === 2 ? borderColor.blue : borderColor.none}`}
          >
            {value[2]}
          </div>
        </div>
      </div>
    </div>
  );
}
