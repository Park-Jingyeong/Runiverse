import { ReactNode } from "react";
import SearchBar from "@/components/searchbar";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchBar />
      <main>{children}</main>
    </>
  );
}
