export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log(params);
  const { id } = await params;
  console.log(id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const course = await response.json();
  console.log(course);
  if (!course) return <div> 해당 코스를 찾을 수 없습니다.</div>;

  return (
    <div>
      {/* 이미지 */}
      <h1 className="font-bold text-xl">{course.name}</h1>
      <div>거리 - {course.distance}km</div>
      <div>
        <h2 className="font-bold text-lg">예상 소요 시간</h2>
        1km를 ()분 ()초로 뛰었을 때 약 ()시간 ()분 걸려요
      </div>
      <div>
        <h2 className="font-bold text-lg">난이도</h2>
      </div>
      <div>
        <h2 className="font-bold text-lg">고도</h2>
        {course.slope}
      </div>
      <div>
        <h2 className="font-bold text-lg">편의 시설</h2>
        <div>화장실 - {course.toilet}</div>
        <div>주차 공간 - {course.parking}</div>
      </div>
      <div>
        <h2>지도</h2>
      </div>
    </div>
  );
}
