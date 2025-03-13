// src/components/gradientBar.tsx

interface CourseInfo {
  title: string;
  value: string[];
  state: number;
}

const barLocation = {
  left: "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 left-5",
  center: "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 right-1/2",
  right: "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 right-5",
};

export default function GradientBar({ title, value, state }: CourseInfo) {
  let bar = "";
  switch (state) {
    case (0):
      bar = "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 left-5";
      break;
    case (1):
      bar =
        "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 right-1/2";
      break;
    case (2):
      bar = "absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 right-5";
      break;
  }
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="w-full relative">
        <div className="rounded-xl bg-gradient-to-r from-[#A7F2FF] via-[#E7A768] to-[#FF2F2F] w-full h-8" />
        <div className={bar} />
      </div>
      <div className="flex">
        <div className="w-1/3 text-left">{value[0]}</div>
        <div className="w-1/3 text-center">{value[1]}</div>
        <div className="w-1/3 text-right">{value[2]}</div>
      </div>
    </div>
  );
}
