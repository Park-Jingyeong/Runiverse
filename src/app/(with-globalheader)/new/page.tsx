"use client";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    distance: "",
    image: "",
    difficulty: "",
    slope: "",
    pavement: "",
    complexity: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "applicatino/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "코스 등록 실패");

      setMessage("코스 등록 성공");
      setForm({
        name: "",
        distance: "",
        image: "",
        difficulty: "",
        slope: "",
        pavement: "",
        complexity: "",
      });
    } catch (error) {
      setMessage("코스 등록 오류");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>러닝 코스 등록</h1>
      <form onSubmit={handleSubmit}>
        <h2>코스명</h2>
        <input
          type="text"
          name="name"
          placeholder="어떤 코스인가요?"
          value={form.name}
          onChange={handleChange}
        />
        <h2>총 거리</h2>
        <input
          type="text"
          name="distance"
          placeholder="총 거리를 입력해주세요."
          onChange={handleChange}
        />
        <h2>이미지를 첨부해주세요.</h2>
        {/* 이미지 첨부 */}

        {/* 지도 */}
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          <option value="very easy">아주 쉬움</option>
          <option value="easy">조금 쉬움</option>
          <option value="medium">중간</option>
          <option value="hard">조금 어려움</option>
          <option value="very hard">아주 어려움</option>
        </select>
        <select name="slope" value={form.slope} onChange={handleChange}>
          <option value="flat">평지</option>
          <option value="hilly">완만한 언덕</option>
          <option value="steep">가파른 언덕</option>
        </select>

        <select name="pavement" value={form.pavement} onChange={handleChange}>
          <option value="paved">포장 도록</option>
          <option value="gravel">혼합</option>
          <option value="trail">비포장 도로</option>
        </select>

        <select
          name="complexity"
          value={form.complexity}
          onChange={handleChange}
        >
          <option value="low">직선 코스</option>
          <option value="moderate">S자 커브</option>
          <option value="high">다양한 갈래길</option>
        </select>
        <button
          type="submit"
          className="bg-[#4BB7D4] text-white rounded-xl w-40 h-10"
        >
          등록하기
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
