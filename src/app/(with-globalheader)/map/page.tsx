import KakaoMaps from "@/components/kakaoMaps";
import MapSearchResult from "@/components/mapSearchResult";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <Suspense fallback={<p className="text-center py-5">불러오는 중...</p>}>
        <SearchBar />
      </Suspense>
      <KakaoMaps />
      {/* @ToDo - MapSearchResult 카드 위치 변경, 슬라이더 적용 */}
      <div className="absolute bottom-[90px]">
        <MapSearchResult />
      </div>
    </div>
  );
}
