import KakaoMaps from "@/components/kakaoMaps";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <Suspense fallback={<p className="text-center py-5">불러오는 중...</p>}>
        <SearchBar />
      </Suspense>
      <KakaoMaps />
    </div>
  );
}
