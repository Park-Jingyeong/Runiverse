// with-globalfooter
import Link from "next/link";
import home_inactive from "@/../public/home_inactive.svg";
import home_active from "@/../public/home_active.svg";
import map_inactive from "@/../public/map_inactive.svg";
import map_active from "@/../public/map_active.svg";
import search_active from "@/../public/search_active.svg";
import search_inactive from "@/../public/search_inactive.svg";
import profile_active from "@/../public/profile_active.svg";
import profile_inactive from "@/../public/profile_inactive.svg";
import Image from "next/image";

export default function GlobalFooter() {
  return (
    <footer className="flex justify-between px-10 py-3 shadow-[0_-4px_8px_rgba(200,200,200,0.2)] bg-white">
      <Link
        href={"/"}
        className="flex flex-col gap-1 items-center text-center content-center text-[#737373]"
      >
        <Image src={home_inactive} alt="home" />홈
      </Link>
      <Link
        href={"/search"}
        className="flex flex-col gap-1 items-center text-center content-center text-[#737373]"
      >
        <Image src={search_inactive} alt="search" />
        검색
      </Link>
      <Link
        href={"/map"}
        className="flex flex-col gap-1 items-center text-center content-center text-[#737373]"
      >
        <Image src={map_inactive} alt="map" />
        지도
      </Link>
      <Link
        href={"/profile"}
        className="flex flex-col gap-1 items-center text-center content-center text-[#737373]"
      >
        <Image src={profile_inactive} alt="profile" />내 정보
      </Link>
    </footer>
  );
}
