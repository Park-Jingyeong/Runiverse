// src/app/(with-globalheader)/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
import Image from "next/image";
import { Course } from "@/types/course";
import IndexCourseCard from "@/components/indexCourseCard";
export default function Home() {
  const [randomCourse, setRandomCourse] = useState<Course | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/`
        );
        const data: Course[] = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomCourse(data[randomIndex]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Suspense fallback={<p className="text-center py-5">불러오는 중...</p>}>
        <SearchBar />
      </Suspense>

      <div className="flex flex-col gap-8">
        <section>
          <div>
            <div className="">
              {randomCourse?.imageUrls?.[0] && (
                <Image
                  src={randomCourse.imageUrls[0]}
                  alt="random course image"
                  width={600}
                  height={600}
                />
              )}
            </div>
            <div className="relative -top-[158px]">
              <IndexCourseCard
                name={String(randomCourse?.name)}
                distance={Number(randomCourse?.distance)}
              />
            </div>
          </div>
        </section>
        <section>
          <button className="bg-[#4BB7D4] w-80 h-10 rounded-lg text-white">
            오늘의 러닝 코스 추천받기
          </button>
        </section>
        <section>
          <div className="flex justify-between">
            <h2 className="bold text-xl">추천 많은 코스</h2>
            <button>더보기</button>
          </div>
          <div className="flex flex-col gap-3">
            <div>course component 1</div>
            <div>course component 2</div>
            <div>course component 3</div>
          </div>
        </section>
        <section>
          <h2 className="bold text-xl">지역별 추천 코스</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <button>city - link</button>
              <button>city - link</button>
            </div>
            <div className="flex justify-between">
              <button>city - link</button>
              <button>city - link</button>
            </div>
          </div>
        </section>
        <Link href={"/new"}>
          <button className="text-lg bg-[#4BB7D4] text-white rounded-lg p-2">
            임시 코스 등록 버튼
          </button>
        </Link>
      </div>
    </div>
  );
}
