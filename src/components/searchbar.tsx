// search bar
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import icon_search from "@/../public/search.svg";
import Image from "next/image";
export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="rounded-xl flex justify-between p-3 bg-opacity-70 shadow-[0_8px_10px_0_rgba(0,0,0,0.15)]">
      <input
        value={search}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        placeholder="장소를 입력해주세요"
        className="w-full focus:outline-none text-sm"
      />
      <button onClick={onSubmit}>
        <Image src={icon_search} alt="검색" />
      </button>
    </div>
  );
}
