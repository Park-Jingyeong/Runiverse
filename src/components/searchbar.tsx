// search bar
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input
        value={search}
        onChange={onChangeInput}
        placeholder="장소를 입력해주세요"
        className="border-2"
      />
      <button onClick={onSubmit} className="border-2">검색</button>
    </div>
  );
}
