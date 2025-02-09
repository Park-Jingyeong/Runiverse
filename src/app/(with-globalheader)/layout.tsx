import Link from "next/link";
import { ReactNode } from "react";
import { Pridi } from "next/font/google";

const pridi = Pridi({
  weight: "700",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b-2 p-3">
        <Link href={"/"}>
          <h1 className={`${pridi.className} text-5xl`}>Runiverse</h1>
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
}
