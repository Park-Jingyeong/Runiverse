// src/components/mapSearch.tsx

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

type MapSearchProps = {
  address: string;
  setAddress: (value: string) => void;
  region: [string, string, string];
  setRegion: (value: [string, string, string]) => void;
  point: string;
};

export type MapSearchRefType = {
  handleSearch: (point: string) => void;
};

// 1. 키워드로 장소 검색하기
// 2. 좌표로 주소 얻어내기
const MapSearch = forwardRef<MapSearchRefType, MapSearchProps>(
  ({ address, setAddress, region, setRegion, point }, ref) => {
    const [map, setMap] = useState<any>(null);
    const [keyword, setKeyword] = useState("");
    const [marker, setMarker] = useState<any>();
    const mapRef = useRef<HTMLDivElement>(null);
    const infowindowRef = useRef<any>(null); // infowindow 재사용을 위한 ref
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      handleSearch,
    }));

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

        // 클릭한위치를 표시할 마커
        const marker = new window.kakao.maps.Marker();
        setMarker(marker);

        // infowindow 초기화
        infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      });
    }, []);

    const useDidMoustEffect = (func: any, deps: any) => {
      const didMount = useRef(false);
      useEffect(() => {
        if (didMount.current) {
          func();
        } else {
          didMount.current = true;
        }
      }, deps);
    };

    // 첫 렌더링 시에 함수 실행을 막기 위한 Hook
    useDidMoustEffect(() => {
      if (!map || !marker || !infowindowRef.current) return;
      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소 정보를 표시하는 이벤트 등록
      window.kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent: any) {
          // Geocoder 주소-좌표 변환 객체 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          const latLng = mouseEvent.latLng;

          if (!latLng) return;
          // services.Geocoder

          // geocoder.coord2Address: 좌표값에 해당하는 주소 정보 요청
          geocoder.coord2Address(
            latLng.getLng(),
            latLng.getLat(),
            function (result: any, status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                // address.address_name: 지번 주소
                // road_address.address_name: 도로명 주소
                // 지번 주소와 도로명 주소 섞여서 나오기도 함
                const address = result[0].address.address_name;
                const region1 = String(result[0].address.region_1depth_name);
                const region2 = String(result[0].address.region_2depth_name);
                const region3 = String(result[0].address.region_3depth_name);
                setAddress(address);
                setRegion([region1, region2, region3]);
                // 마커 위치 재설정
                marker.setMap(null);
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);
                // 인포윈도우 닫고 다시 열기
                infowindowRef.current.close();
                infowindowRef.current.setContent(
                  '<div style="padding:5px;font-size:12px;">' +
                    address +
                    "</div>"
                );
                infowindowRef.current.open(map, marker);
              }
            }
          );
        }
      );
    }, [map]);

    // 키워드 검색 구현
    // 상위 컴포넌트인 locationPointInput에서 찾기 버튼을 클릭하면 실행되도록 해야 함
    const handleSearch = (point: string) => {
      if (!map || !point) return;
      // 마커 클릭하면 장소명 표출하는 인포윈도우
      // const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // 위 대신 infowindowRef로 재사용
      const infowindow = infowindowRef.current;
      // 장소 검색 객체 생성
      const ps = new window.kakao.maps.services.Places();
      // 키워드로 장소 검색
      ps.keywordSearch(point, placeSearchCB);

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
          const lat = place.y;
          const lng = place.x;

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(lng, lat, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              const region1 = result[0].address.region_1depth_name;
              const region2 = result[0].address.region_2depth_name;
              const region3 = result[0].address.region_3depth_name;
              setAddress(address);
              setRegion([region1, region2, region3]);
            }
          });
          // 기존 인포윈도우 닫기
          infowindow.close();
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
          <input
            onChange={onChangeInput}
            value={keyword}
            className="border-2"
          />
          {/* <button type="button" onClick={handleSearch}>
            검색
          </button> */}
        </div>
        <div ref={mapRef} className="w-full h-[320px]" />
        <div>위치 {address}</div>
        <div>
          행정구역 {region[0]} {region[1]} {region[2]}
        </div>
        <div>
          장소명 {point}
        </div>
      </div>
    );
  }
);

MapSearch.displayName = "MapSearch";

export default MapSearch;
// @TODO 검색 -> 임의 위치 클릭 (마커, 인포윈도우 생성) -> 검색 결과 마커 클릭 -> 임의 위치 마커 안사라짐
