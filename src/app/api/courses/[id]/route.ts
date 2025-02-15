import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("Fetching course with ID:", id);

  try {
    const courseRef = doc(db, "courses", id);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      return NextResponse.json(
        { error: "코스를 찾을 수 없음" },
        { status: 404 }
      );
    }

    return NextResponse.json(courseSnap.data());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    console.log("코스 수정", id, body);

    const courseRef = doc(db, "courses", id);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      return NextResponse.json(
        { error: "코스를 찾을 수 없음" },
        { status: 404 }
      );
    }

    await updateDoc(courseRef, body);
    return NextResponse.json({ message: "코스 수정 성공" });
  } catch (error) {
    console.log("코스 수정 에러:", error);
    return NextResponse.json({ error: "코스 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    console.log("코스 삭제:", id);

    const courseRef = doc(db, "courses", id);
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      return NextResponse.json(
        { error: "코스를 찾을 수 없음" },
        { status: 404 }
      );
    }
    await deleteDoc(courseRef);

    return NextResponse.json({ message: "코스 삭제 성공" });
  } catch (error) {
    console.log("코스 삭제 에러:", error);
    return NextResponse.json({ error: "코스 삭제 실패" }, { status: 500 });
  }
}
