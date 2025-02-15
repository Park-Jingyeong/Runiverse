import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, Timestamp, collection } from "firebase/firestore";
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
      difficulty: body.difficulty,
      slope: body.slope,
      pavement: body.pavement,
      complexity: body.complexity,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: courseRef.id, message: "코스 등록 완료" });
  } catch (error) {
    console.error("코스 등록 에러:", error);
    return NextResponse.json({ error: "코스 등록 실패" }, { status: 500 });
  }
}
