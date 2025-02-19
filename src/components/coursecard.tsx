// src/components/coursecard.tsx

import Image from "next/image";
import flag from "@/../public/flag.svg";
import pin_20 from "@/../public/pin_20.svg";
import star_fill_20 from "@/../public/star_fill_20.svg";
import distance_20 from "@/../public/distance_20.svg";
import bg1 from "@/../public/bg1.jpg";
import { Course } from "@/types/course";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="max-w-[568px] h-[150px] flex rounded-xl overflow-hidden mb-2">
      <div className="relative w-[200px] h-[150px]">
        <Image
          src={bg1}
          alt="background image"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <div className="w-[368px] border-y-2 border-r-2 rounded-r-xl p-4 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg">{course.name}</h1>
            <div className="flex gap-1 items-center">
              <Image src={pin_20} alt="location" />
              <h2>{course.location}</h2>
            </div>
          </div>
          <Image src={flag} alt="bookmark" />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <Image src={distance_20} alt="distance" />
            <div>{course.distance}km</div>
          </div>
          <div className="flex gap-1 items-center">
            <Image src={star_fill_20} alt="star_fill_20" />
            <div>{course.difficulty}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
