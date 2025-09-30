import React from "react";

export default function AdsHeader() {
  return (
    <div class="ads-header-wrapper" >
      <a
        href="/test"
        class="ads-header hidden-sm"
        target="_blank"
        style={{backgroundImage: `url(./assets/img/banner/large-ads.jpg)`}}
      ></a>
    </div>
  );
}
