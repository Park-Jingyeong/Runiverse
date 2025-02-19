import { ReactNode, Suspense } from "react";
import SearchBar from "@/components/searchbar";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense>
        <SearchBar />
      </Suspense>
      <main>{children}</main>
    </>
  );
}
