// src/components/mapSearch.tsx

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapSearch() {
  const [map, setMap] = useState<any>(null)
  const [keyword, setKeyword] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = mapRef.current;
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(map)
      });
    }
    onLoadKakaoMap();
  }, []);

  const handleSearch = () => {
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, placeSearchCB);
    function placeSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }

    function displayMarker(place: any) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  };

  return (
    <div>
      <div>
        <input onChange={onChangeInput} value={keyword} className="border-2" />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div ref={mapRef} className="w-full h-[320px]" />
    </div>
  );
}
