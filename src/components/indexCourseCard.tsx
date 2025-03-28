import Image from "next/image";
import distance_20 from "@/../public/distance_20.svg";
import pin_20 from "@/../public/pin_20.svg";
import bar_20 from "@/../public/bar_20.svg";
import recommend_24 from "@/../public/recommend_24.svg";

interface Props {
  name: string;
  distance: number;
}

export default function IndexCourseCard({ name, distance }: Props) {
  return (
    <div className="opacity-70 bg-white rounded-xl flex flex-col gap-2 p-6 h-[124px]">
      <h1 className="font-bold text-2xl">{name}</h1>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <Image src={distance_20} alt="distance" />
          <div className="text-lg">{distance}km</div>
        </div>
        <div className="flex gap-1">
          <Image src={recommend_24} alt="recommend" />
          <div className="text-lg">recommend</div>
        </div>
        <div className="w-[2px] h-[30px] bg-black rounded-[50px] opacity-1" />
        <div className="flex gap-1">
          <Image src={pin_20} alt="location" />

          <div className="text-xl">location</div>
        </div>
      </div>
    </div>
  );
}
