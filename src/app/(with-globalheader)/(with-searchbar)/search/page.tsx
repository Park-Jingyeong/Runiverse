// src/app/(with-globalheader)/(with-searchbar)/search/page.tsx

import SearchResult from "@/components/searchResult";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="py-4">
      <Suspense fallback={<p className="text-center py-5">불러오는 중...</p>}>
        <SearchResult />
      </Suspense>
    </div>
  );
}
