// src/app/api/courses/route.ts
import { db } from "@/lib/firebase";
import {
  doc,
  getDocs,
  addDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("받은 코스 데이터:", body);

    if (!body.name || !body.distance) {
      return NextResponse.json({ error: "필수 입력값 부족" }, { status: 400 });
    }
    const courseRef = await addDoc(collection(db, "courses"), {
      name: body.name,
      distance: body.distance,
      // difficulty: body.difficulty,
      slope: body.slope,
      pavement: body.pavement,
      complexity: body.complexity,
      image: body.image,
      imageUrl: body.imageUrl,
      toilet: body.toilet,
      parking: body.parking,
      // createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: courseRef.id, message: "코스 등록 완료" });
  } catch (error) {
    console.error("코스 등록 에러:", error);
    return NextResponse.json({ error: "코스 등록 실패" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(courses);
  } catch (error) {
    console.error("코드 데이터 불러오기 에러", error);
    return NextResponse.json({ error: "코스 불러오기 실패" }, { status: 500 });
  }
}
