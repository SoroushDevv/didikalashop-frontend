import React,{useEffect}from "react";
import Description from "./Description/Description";
import MainFooterContent from "./MainContent/MainFooterContent";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function Footer({top}) {
  const kalaLetters = ["D", "I", "D", "I", "K", "A", "L", "A"];



useEffect(() => {

  const lettersShow = () => {
     
    kalaLetters.map((letter) => {
      console.log(letter)
    })
  }



  lettersShow()

},[])


const smoothScroll = () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
}

  return (
    <footer className="w-full bg-white pt-6 border-t border-gray-200" dir="rtl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div onClick={() => smoothScroll()} className="back-to-top w-full text-center mb-6">
            <span className="text-sm font-semibold ml-2 group-hover:scale-105 transition-transform duration-200">
              بازگشت به بالا
            </span>
            <KeyboardDoubleArrowUpIcon className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
        </div>
      </div>

      <div className="w-full bg-gray-50 py-4 mb-8 border-t border-b border-gray-200">
        <ul className="flex flex-row-reverse justify-center space-x-1 space-x-reverse text-4xl font-black">
          {kalaLetters.map((letter, index) => (
            <li
              key={letter + index}
              className={`kala-letters text-gray-400 hover:text-brand-primary hover:-translate-y-2 transition duration-200 ease-in-out cursor-pointer text-5xl`}
            >
              {letter}
            </li>
          ))}
        </ul>
      </div>
      
      <MainFooterContent/>
      <Description />
      
      <div className="w-full bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            استفاده از مطالب فروشگاه اینترنتی تاپ کالا فقط برای مقاصد غیرتجاری و
            با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت نوآوران فن
            آوازه (فروشگاه آنلاین تاپ کالا) می‌باشد.
          </p>
        </div>
      </div>
    </footer>
  );
}