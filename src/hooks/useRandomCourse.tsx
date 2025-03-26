// src/hooks/useRandomCourse.tsx

"use client";
import { useEffect, useState } from "react";
import { Course } from "@/types/course";
const useRandomCourse = () => {
  const [randomCourse, setRandomCourse] = useState<Course>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`
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
  return randomCourse;
};

export default useRandomCourse;
