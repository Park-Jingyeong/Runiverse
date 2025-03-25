// src/components/kakaoMaps.tsx
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

// @TODO - props address 받아오기
export default function KakaoMaps() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 반환 객체 생성
        geocoder.addressSearch("도공촌 3길", (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료되면
            // eslint-disable-next-line no-var
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const container = mapRef.current;
            const options = {
              center: coords,
              level: 3,
            };
            // 지도 생성
            const map = new window.kakao.maps.Map(mapRef.current, options);
            // 결과값으로 받은 위치를 마커로 표시
            new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
          } else {
            // 정상적으로 좌표가 검색이 안될 경우 default 좌표로 검색
            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };
            // 지도를 생성
            const map = new window.kakao.maps.Map(container, options);
            new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
          }
        });
      });
    };
    onLoadKakaoMap();
    // [address]
  }, []);

  return (
    <div>
      <div ref={mapRef} className="w-full h-[320px] " />
    </div>
  );
}
