// src/app/(with-globalheader)/new/page.tsx

"use client";
import { useState } from "react";
import add_48 from "@/../public/add_48.svg";
import Image from "next/image";
import KakaoMaps from "@/components/kakaoMaps";
import LocationPointInput from "@/components/input/loactionPointInput";
import CourseInfoInput from "@/components/input/courseInfoInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    distance: "",
    slope: 0,
    pavement: 0,
    complexity: 0,
    toilet: null,
    parking: null,
    image: null as File | null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const storageRef = ref(storage, `course-image-test/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((prev) => ({
        ...prev,
        image: file,
        imageUrl: url,
      }));
      const previewUrl = URL.createObjectURL(file);
      setUploadedUrl(previewUrl);
      console.log("file uploaded successfully");
      console.log(uploadedUrl);
    }
  };

  const handleGradientChange = (
    key: "slope" | "pavement" | "complexity",
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFacilityChange = (key: "toilet" | "parking", value: number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
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
                {/* @TODO 거리 숫자값 변경 필요 */}
                <input
                  className="w-full h-[50px] border-2 rounded-xl p-4"
                  type="text"
                  name="distance"
                  placeholder="총 거리를 입력해주세요."
                  value={form.distance}
                  onChange={handleChange}
                />
                <div className="text-xl font-bold">km</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">이미지를 첨부해주세요.</h2>
              {/* @TODO - 이미지 첨부 Preview 수정 */}
              <label className="border-2 rounded-xl w-[140px] h-[140px] cursor-pointer flex">
                {form.image ? (
                  <div>
                    <Image
                      src={uploadedUrl}
                      alt="preview"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-xl m-auto"
                    />
                  </div>
                ) : (
                  <Image src={add_48} alt="add image" className="m-auto" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <div className="text-sm text-[#737373]">
                러닝 기록 캡쳐 사진도 좋아요!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-center">
              코스의 경로를 입력해주세요.
            </h1>
            {/* @TODO - 지도 */}
            <KakaoMaps />
            <LocationPointInput />
          </div>
          <div className="flex flex-col gap-6">
            <CourseInfoInput
              onChangeSlope={(value) => handleGradientChange("slope", value)}
              onChangePavement={(value) =>
                handleGradientChange("pavement", value)
              }
              onChangeComplexity={(value) =>
                handleGradientChange("complexity", value)
              }
              onChangeToilet={(value) => handleFacilityChange("toilet", value)}
              onChangeParking={(value) =>
                handleFacilityChange("parking", value)
              }
            />
          </div>
          {/* @TODO - 로딩 처리 */}
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
