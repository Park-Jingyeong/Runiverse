// src/components/mapSearch.tsx

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

// 1. 키워드로 장소 검색하기
// 2. 좌표로 주소 얻어내기
export default function MapSearch() {
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState("");
  const [clickedAddress, setClickedAddress] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      // 지도 container
      const mapContainer = mapRef.current;
      // 지도 중심 좌표와 확대 레벨
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      // 지도 생성
      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      //

      // 주소-좌표 변환 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 클릭한위치를 표시할 마커
      const marker = new window.kakao.maps.Marker();
      // 클릭한 위치에 대한 주소를 표시할 인포윈도우
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // 현재 지도 중심 좌표로 주소를 검색해서 지도 좌측 상단에 표시 (행정구역 정보?)
      // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소 정보를 표시하는 이벤트 등록
      window.kakao.maps.event.addListener(
        mapInstance,
        "click",
        function (mouseEvent: any) {
          const latlng = mouseEvent.latlng;
          console.log(latlng);
          if (!latlng) return;
          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            function (result: any, status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                setClickedAddress(address);
              }
            }
          );

          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result: any, status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                const detailAddr = !!result[0].road_address
                  ? "<div>도로명 주소 : " +
                    result[0].road_address.address_name +
                    "</div>" +
                    "<div>지번 주소 : " +
                    result[0].address.address_name +
                    "</div>"
                  : "";
                const content =
                  '<div class="bAddr">' +
                  '<span class="title">법정동 주소정보</span>' +
                  detailAddr +
                  "</div>";

                // 마커를 클릭한 위치에 표시
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소 정보 표시
                infowindow.setContent(content);
                infowindow.open(map, marker);
              }
            }
          );
        }
      );

      // window.kakao.maps.event.addListener(map, "idle", function () {
      //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      // });

      function searchAddrFromCoords(coords: any, callback: any) {
        // 좌표로 행정동 주소 정보를 요청
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }
      function searchDetailAddrFromCoords(coords: any, callback: any) {
        // 좌표로 법정동 상세 주소 정보를 요청
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // function displayCenterInfo(result: any, status: any) {
      //   if (status === window.kakao.maps.services.Status.OK) {
      //     const infoDiv = document.getElementById("centerAddr");

      //     for (let i = 0; i < result.length; i++) {
      //       // 행정동의 region_type 값은 'H'
      //       if (result[i].region_type === "H") {
      //         infoDiv.innerHTML = result[i].address_name;
      //         break;
      //       }
      //     }
      //   }
      // }
    });
  }, []);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 마커 클릭하면 장소명 표출하는 인포윈도우
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색
    ps.keywordSearch(keyword, placeSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placeSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표 추가
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위 재설정
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place: any) {
      // 마커 생성하고 지도에 표시
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됨
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
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div ref={mapRef} className="w-full h-[320px]" />
    </div>
  );
}
