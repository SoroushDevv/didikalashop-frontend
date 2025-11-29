import React,{useState} from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/Twitter";
import TwitterIcon from "@mui/icons-material/Twitter";
import HoverTooltip from "../../../Tooltip/HoverToolTip";
import ShowSwal from "./../../../ShowSwal/ShowSwal"
export default function Widgets() {

  const [email,setEmail] = useState(null)







 const mailSubscription = () => {
     
 if(email.includes("@gmail.com")){
  ShowSwal({title:"ایمیل با موفقیت ثبت شد",text:"",icon:"success"})
  setEmail('')
 }else {
    ShowSwal({title:"فرمت ایمیل را صحیح وارد کنید",text:"",icon:"info"})

 }

  }





  return (
<div class="py-10 bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-sm p-4 h-full">
                    <h3 class="text-lg font-bold mb-3 border-b pb-2 text-gray-700">راهنمای خرید از تاپ کالا</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">نحوه ثبت سفارش</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">رویه ارسال سفارش</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">شیوه‌های پرداخت</a></li>
                    </ul>
                </div>
            </div>

            <div class="lg:col-span-1 ">
                <div class="bg-white rounded-lg shadow-sm p-4  h-full">
                    <h3 class="text-lg font-bold mb-3 border-b pb-2 text-gray-700">خدمات مشتریان</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">پاسخ به پرسش‌های متداول</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">رویه‌های بازگرداندن کالا</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">شرایط استفاده</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">حریم خصوصی</a></li>
                    </ul>
                </div>
            </div>

            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-sm p-4  h-full">
                    <h3 class="text-lg font-bold mb-3 border-b pb-2 text-gray-700">با تاپ کالا</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">فروش در تاپ کالا</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">همکاری با سازمان‌ها</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">فرصت‌های شغلی</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">تماس با تاپ کالا</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">درباره تاپ کالا</a></li>
                    </ul>
                </div>
            </div>

            <div class="lg:col-span-1">
                <div class="mb-6">
                    <p class="text-gray-700 mb-3">از تخفیف‌ها و جدیدترین‌های فروشگاه باخبر شوید:</p>
                    <form action="" class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                        <input
                            type="email"
                            class="email-input flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="آدرس ایمیل خود را وارد کنید..."
                        />
                        <button
                            type="button"
                            class="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            onClick={(e) => mailSubscription(e)}
                        >
                            ارسال
                        </button>
                    </form>
                </div>
                
                <div class="socials">
                    <p class="text-gray-700 mb-3">ما را در شبکه های اجتماعی دنبال کنید.</p>
                    <div class="footer-social">
                        <ul class="flex justify-center md:justify-start space-x-4 space-x-reverse">
                            <li class="instagram-icon">
                                <a href="#" class="text-gray-500 hover:text-pink-600 transition-colors" title="اینستاگرام">
                                    <InstagramIcon class="w-6 h-6"/>
                                </a>
                            </li>

                            <li class="telegram-icon">
                                <a href="#" class="text-gray-500 hover:text-blue-400 transition-colors" title="تلگرام">
                                    <TelegramIcon class="w-6 h-6"/>
                                </a>
                            </li>

                            <li class="facebook-icon">
                                <a href="#" class="text-gray-500 hover:text-blue-700 transition-colors" title="فیس‌بوک">
                                    <FacebookIcon class="w-6 h-6"/>
                                </a>
                            </li>

                            <li class="x-icon">
                                <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors" title="توییتر">
                                    <XIcon class="w-6 h-6"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  );
}
