import info_bar from "@/../public/info_bar.png";
import info_stick from "@/../public/info_stick.png";
import Image from "next/image";
export default function GradientBar() {
  return (
    <div className="w-full relative">
      <div className="rounded-xl bg-gradient-to-r from-[#A7F2FF] via-[#E7A768] to-[#FF2F2F] w-full h-8" />
      <div className="absolute bg-black w-[6px] h-11 rounded-xl top-[-5px] bottom-0 left-[10px]" />
    </div>
  );
}
