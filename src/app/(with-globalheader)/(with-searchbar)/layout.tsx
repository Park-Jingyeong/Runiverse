import { ReactNode, Suspense } from "react";
import SearchBar from "@/components/searchbar";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <SearchBar />
      </Suspense>
      <main>{children}</main>
    </>
  );
}
