import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <footer className="flex gap-3 border-t-2 p-3">
        <Link
          href={"/"}
          className="w-16 h-10 border-2 text-center content-center"
        >
          홈
        </Link>
        <Link
          href={"/search"}
          className="w-16 h-10 border-2 text-center content-center"
        >
          검색
        </Link>
        <Link
          href={"/map"}
          className="w-16 h-10 border-2 text-center content-center"
        >
          지도
        </Link>
        <Link
          href={"/profile"}
          className="w-16 h-10 border-2 text-center content-center"
        >
          내 정보
        </Link>
      </footer>
    </>
  );
}
