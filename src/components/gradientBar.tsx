// src/components/gradientBar.tsx

interface CourseInfo {
  title: string;
  value: number;
  state: [string, string, string];
}

export default function GradientBar({ title, value, state }: CourseInfo) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="w-full relative">
        <div className="rounded-xl bg-gradient-to-r from-[#A7F2FF] via-[#E7A768] to-[#FF2F2F] w-full h-8" />
        <div className="absolute bg-black w-1 h-11 rounded-xl top-[-5px] bottom-0 left-1/2" />
      </div>
      <div className="flex">
        <div className="w-1/3 text-left">{state[0]}</div>
        <div className="w-1/3 text-center">{state[1]}</div>
        <div className="w-1/3 text-right">{state[2]}</div>
      </div>
    </div>
  );
}