import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("Fetching course with ID:", id);

  try {
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "코스를 찾을 수 없음" },
        { status: 404 }
      );
    }

    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
