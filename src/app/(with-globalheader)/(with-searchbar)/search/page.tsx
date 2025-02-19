// search page
interface Course {
  id: number;
  name: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const data: Course[] = await response.json();
  const filteredData = data.filter((course) =>
    course.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="py-4">
      <ul>
        {filteredData.map((course) => (
          <h1 key={course.id}>{course.name}</h1>
        ))}
      </ul>
    </div>
  );
}
