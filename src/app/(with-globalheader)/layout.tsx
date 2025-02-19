// with-globalheader
"use client";
import { ReactNode } from "react";
import GlobalHeader from "@/components/header/globalheader";
import GlobalFooter from "@/components/footer/globalfooter";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = ["/new"];
  const hideFooterDynamic =
    hideFooter.includes(pathname) || pathname.startsWith("/courses");
  return (
    <>
      <GlobalHeader />
      <main
        className={`${
          hideFooterDynamic
            ? "min-h-[calc(100%-72px)]"
            : "min-h-[calc(100%-160px)]"
        } bg-white p-4`}
      >
        {children}
      </main>
      {!hideFooterDynamic && <GlobalFooter />}
    </>
  );
}
