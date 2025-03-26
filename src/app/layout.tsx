// RootLayout
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

const pretendard = localFont({
  src: "../style/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Runiverse",
  description: "Runiverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full ${pretendard.variable}`}>
      <body
        className={`max-w-[600px] mx-auto my-0 bg-gray-50 h-full font-pretendard`}
      >
        {/* 스크립트 로딩이 끝나기 전 v3 객체에 접근하면 에러 발생 -> autoload=false 지정 */}
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
        />
        {children}
      </body>
    </html>
  );
}
