import React from "react";
import "./Footer.css"
import Description from "./Description/Description";
import MainFooterContent from "./MainContent/MainFooterContent";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function Footer({top}) {

  return (
    <footer class="main-footer dt-sl" style={{position:"absolute",top:top}}>
      <div class="back-to-top">
        <a href="#">
          <span className="scale-up-top-normal">بازگشت به بالا</span>
           <KeyboardDoubleArrowUpIcon className="back-to-top__icon scale-up-top-normal"/>
        </a>
      </div>
      <div className="didikala">
        <ul>
          <li className="kala-letters">D</li>
          <li className="kala-letters">I</li>
          <li className="kala-letters">D</li>
          <li className="kala-letters">I</li>
          <li className="kala-letters">K</li>
          <li className="kala-letters">A</li>
          <li className="kala-letters">L</li>
          <li className="kala-letters">A</li>
        </ul>
       
      </div>
   <MainFooterContent/>
   <Description />
      <div class="copyright">
        <div class="container main-container">
          <p>
            استفاده از مطالب فروشگاه اینترنتی تاپ کالا فقط برای مقاصد غیرتجاری و
            با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت نوآوران فن
            آوازه (فروشگاه آنلاین تاپ کالا) می‌باشد.
          </p>
        </div>
      </div>
    </footer>
  );
}
