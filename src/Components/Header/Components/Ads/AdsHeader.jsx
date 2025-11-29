import React from "react";

export default function AdsHeader() {
  return (
    <div className="w-full h-auto" dir="rtl">
      <a
        href="/test"
        className="w-full h-24 bg-cover bg-center block transition-opacity duration-300 hover:opacity-90 max-sm:h-auto max-sm:hidden"
        target="_blank"
        rel="noopener noreferrer"
        style={{backgroundImage: `url(./assets/img/banner/large-ads.jpg)`}}
      >
      </a>
    </div>
  );
}