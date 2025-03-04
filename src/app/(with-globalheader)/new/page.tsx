"use client";
import { useState } from "react";
import add_48 from "@/../public/add_48.svg";
import Image from "next/image";
import KakaoMaps from "@/components/kakaoMaps";
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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-center">
              러닝 코스를 등록해볼까요?
            </h1>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">코스명</h2>
              <input
                className="w-full h-[50px] border-2 rounded-xl p-4"
                type="text"
                name="name"
                placeholder="어떤 코스인가요?"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">총 거리</h2>
              <div className="flex gap-2 items-end">
                <input
                  className="w-full h-[50px] border-2 rounded-xl p-4"
                  type="text"
                  name="distance"
                  placeholder="총 거리를 입력해주세요."
                  onChange={handleChange}
                />
                <div className="text-xl font-bold">km</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">이미지를 첨부해주세요.</h2>
              {/* 이미지 첨부 구현 */}
              <button className="w-[140px] h-[140px] border-2 rounded-xl">
                <Image src={add_48} alt="add image" className="m-auto" />
              </button>
              <div className="text-sm text-[#737373]">
                러닝 기록 캡쳐 사진도 좋아요!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-center">
              코스의 경로를 입력해주세요.
            </h1>
            {/* 지도 */}
            <KakaoMaps />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-center">
              코스의 난이도는 어땠나요?
            </h1>
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

            <select
              name="pavement"
              value={form.pavement}
              onChange={handleChange}
            >
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
          </div>
          <button
            type="submit"
            className="bg-[#4BB7D4] text-white rounded-xl w-40 h-10"
          >
            등록하기
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
