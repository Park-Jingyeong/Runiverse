// src/app/(with-globalheader)/new/page.tsx

"use client";
import { useState, useEffect } from "react";
import add_48 from "@/../public/add_48.svg";
import Image from "next/image";
import LocationPointInput from "@/components/input/loactionPointInput";
import CourseInfoInput from "@/components/input/courseInfoInput";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StringFormat,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Page() {
  // locationPointInput에서의 point
  const [point, setPoint] = useState("");
  // address: 위치에 대한 주소
  const [address, setAddress] = useState("");
  // region: 위치에 대한 행정구역 정보
  const [region, setRegion] = useState<[string, string, string]>(["", "", ""]);
  const [form, setForm] = useState({
    name: "",
    distance: "",
    region: ["", "", ""],
    slope: 0,
    pavement: 0,
    complexity: 0,
    toilet: null,
    parking: null,
    image: [] as File[],
    imageUrls: [] as string[] | [""],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedFiles = Array.from(files);
      const urls: string[] = [];

      for (const file of uploadedFiles) {
        const storageRef = ref(storage, `course-image-test/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }

      setForm((prev) => ({
        ...prev,
        image: [...prev.image, ...uploadedFiles],
        imageUrls: [...prev.imageUrls, ...urls],
      }));

      console.log("file uploaded successfully");
    }
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      region: region,
    }));
  }, [region]);

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
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center">
              러닝 코스를 등록해볼까요?
            </h2>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">코스명</h3>
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
              <h3 className="text-xl font-bold">총 거리</h3>
              <div className="flex gap-2 items-end">
                {/* @TODO - 거리 숫자값 변경 필요 */}
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
              <h3 className="text-xl font-bold">이미지를 첨부해주세요.</h3>
              {/* @TODO - 이미지 첨부 수정 - 최대 3장, 용량 제한 */}
              <div className="flex gap-2 flex-wrap">
                {form.imageUrls.map((url, index) => (
                  <div key={index} className="relative border-2 rounded-xl">
                    <Image
                      src={url}
                      alt={`코스 이미지-${index}`}
                      width={140}
                      height={140}
                      className="w-[140px] h-[140px] object-cover rounded-xl m-auto"
                    />
                  </div>
                ))}
                <label className="border-2 rounded-xl w-[140px] h-[140px] cursor-pointer flex">
                  <Image src={add_48} alt="add image" className="m-auto" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="text-sm text-[#737373]">
                러닝 기록 캡쳐 사진도 좋아요!
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center">
              코스의 경로를 입력해주세요.
            </h2>
            <LocationPointInput
              address={address}
              setAddress={setAddress}
              region={region}
              setRegion={setRegion}
              point={point}
              setPoint={setPoint}
            />
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

// 검색한 지도 위치에 대한 행정구역 정보 표시 필요

// mapSearch에는 출발지와 도착지 두 개의 state 분리 - > 임시로 한 개
// 출발지 검색 -> 찾기 -> 카카오 맵 검색 -> 마커로 위치 선택 -> 출발지의 location, region 저장
// 도착지 검색 -> 찾기 -> 카카오 맵 검색 -> 마커로 위치 선택 -> 도착지의 location, region 저장
// 코스 대표 location, region은 출발지 기준으로 저장
