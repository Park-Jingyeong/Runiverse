// src/app/(with-globalheader)/(with-searchbar)/search/page.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/components/coursecard";
import { Course } from "@/types/course";

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = useMemo(
    () => searchParams.get("q") || "",
    [searchParams]
  );
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/`
        );
        const data: Course[] = await response.json();

        const filteredData = data.filter((course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCourses(filteredData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <div className="py-4">
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      ) : (
        <p className="text-center py-10">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
