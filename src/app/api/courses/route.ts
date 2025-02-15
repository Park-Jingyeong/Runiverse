import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { Course } from "@/types/course";

export async function POST(req: Request) {
  try {
    const { name, distance, location, difficulty } = await req.json();
    const docRef = await addDoc(collection(db, "courses"), {
      name,
      distance,
      location,
      difficulty,
    });
    return NextResponse.json(
      { id: docRef.id, message: "러닝 코스 등록 완료" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "등록 실패" }, { status: 500 });
  }
}

export async function Get() {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses: Course[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "데이터 조회 실패" }, { status: 500 });
  }
}
