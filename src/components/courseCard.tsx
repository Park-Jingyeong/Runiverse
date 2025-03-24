// src/components/coursecard.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import flag_30 from "@/../public/flag_30.svg";
import flag_fill_30 from "@/../public/flag_fill_30.svg";
import pin_20 from "@/../public/pin_20.svg";
import star_fill_20 from "@/../public/star_fill_20.svg";
import distance_20 from "@/../public/distance_20.svg";
import { Course } from "@/types/course";

export default function CourseCard({ course }: { course: Course }) {
  const [isBookMarked, setIsBookMarked] = useState(false);

  const toggleBookMark = () => {
    setIsBookMarked(!isBookMarked);
  };

  return (
    <div className="max-w-[568px] h-[150px] flex rounded-xl overflow-hidden mb-2">
      <Link
        className="relative w-[200px] h-[150px]"
        href={`/courses/${course.id}`}
      >
        <Image
          src={course.imageUrls?.[0]}
          alt="background image"
          style={{ objectFit: "cover" }}
          fill
        />
      </Link>

      <div className="w-[368px] border-y-2 border-r-2 rounded-r-xl p-4 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <Link className="flex flex-col gap-2" href={`/courses/${course.id}`}>
            <h1 className="font-bold text-lg">{course.name}</h1>
            <div className="flex gap-1 items-center">
              <Image src={pin_20} alt="location" />

              <h2>{course.location}</h2>
            </div>
          </Link>
          <button onClick={toggleBookMark}>
            {isBookMarked ? (
              <Image src={flag_fill_30} alt="bookmark active" />
            ) : (
              <Image src={flag_30} alt="bookmark" />
            )}
          </button>
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
