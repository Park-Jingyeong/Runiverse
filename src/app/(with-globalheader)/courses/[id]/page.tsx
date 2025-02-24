// src/app/(with-globalheader)/courses/[id]/page.tsx

"use client";
import Calculator from "@/components/calculator";
import Image from "next/image";
import pin_gray_24 from "@/../public/pin_gray_24.svg";
import flag_30 from "@/../public/flag_30.svg";
import flag_fill_30 from "@/../public/flag_fill_30.svg";
import share from "@/../public/share.svg";
import distance_black_20 from "@/../public/distance_black_20.svg";
import like from "@/../public/like.svg";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Course } from "@/types/course";
import GradientBar from "@/components/gradientBar";

export default function Page() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const params = useParams();
  const { id } = params;

  const toggleBookMark = () => {
    setIsBookMarked(!isBookMarked);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`
        );

        if (!response.ok) {
          return <div>오류가 발생했습니다.</div>;
        }

        const course: Course = await response.json();

        setCourse(course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (!course) {
    return <div>코스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 이미지 */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{course.name}</h1>
            <div className="flex gap-1">
              <Image src={pin_gray_24} alt="location" />
              <div className="text-[#737373] text-base">{course.location}</div>
            </div>
          </div>
          <div className="flex items-start">
            <button onClick={toggleBookMark}>
              {isBookMarked ? (
                <Image src={flag_fill_30} alt="bookmark active" />
              ) : (
                <Image src={flag_30} alt="bookmark" />
              )}
            </button>
            <button className="p-[2px]">
              <Image src={share} alt="share" />
            </button>
          </div>
        </div>
        <div className="flex h-12 border-2 rounded-xl">
          <div className="flex gap-1 w-1/2 justify-center items-center border-r-2">
            <Image src={distance_black_20} alt="distance" />
            <div>{course.distance}km</div>
          </div>
          <button className="flex gap-1 w-1/2 justify-center items-center">
            <Image src={like} alt="like" />
            <div>추천해요</div>
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl">예상 소요 시간</h2>
        <Calculator distance={course.distance} />
      </div>
      <div>
        <div>
          <h2 className="font-bold text-xl">난이도</h2>
          {course.difficulty}
        </div>
        <div>
          <h2 className="font-bold text-lg">고도</h2>
          <GradientBar />
          {course.slope}
        </div>
        <div>
          <h2 className="font-bold text-lg">편의 시설</h2>
          <div>화장실 - {course.toilet}</div>
          <div>주차 공간 - {course.parking}</div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl">지도</h2>
      </div>
    </div>
  );
}
