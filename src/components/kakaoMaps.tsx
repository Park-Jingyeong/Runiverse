// src/components/kakaoMaps.tsx
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMaps() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
    });
  }, []);

  return (
    <div>
      <div ref={mapRef} className="w-full h-[320px] " />
    </div>
  );
}
