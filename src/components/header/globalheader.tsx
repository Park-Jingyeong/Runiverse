// GlobalHeader
import Link from "next/link";
import { Pridi } from "next/font/google";

const pridi = Pridi({
  weight: "700",
  subsets: ["latin"],
});
export default function GlobalHeader() {
  return (
    <header className="p-3 flex justify-center bg-white">
      <Link href={"/"}>
        <h1 className={`${pridi.className} text-5xl`}>Runiverse</h1>
      </Link>
    </header>
  );
}
