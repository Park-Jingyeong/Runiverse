// search/page.tsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/components/coursecard";
import { Course } from "@/types/course";

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!q) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/`
        );
        const data: Course[] = await response.json();

        const filteredData = data.filter((course) =>
          course.name.toLowerCase().includes(q.toLowerCase())
        );
        setCourses(filteredData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, [q]);

  return (
    <Suspense>
      <div className="py-4">
        <ul>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
