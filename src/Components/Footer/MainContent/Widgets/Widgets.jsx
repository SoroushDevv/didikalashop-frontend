import React,{useState} from "react";
import "./Widgets.css";
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
    <div class="footer-widgets">
      <div class="row widgets-wrapper">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="widget-menu widget card">
            <header class="card-header">
              <h3 class="card-title">راهنمای خرید از تاپ کالا</h3>
            </header>
            <ul class="footer-menu">
              <li>
                <a href="#">نحوه ثبت سفارش</a>
              </li>
              <li>
                <a href="#">رویه ارسال سفارش</a>
              </li>
              <li>
                <a href="#">شیوه‌های پرداخت</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="widget-menu widget card">
            <header class="card-header">
              <h3 class="card-title">خدمات مشتریان</h3>
            </header>
            <ul class="footer-menu">
              <li>
                <a href="#">پاسخ به پرسش‌های متداول</a>
              </li>
              <li>
                <a href="#">رویه‌های بازگرداندن کالا</a>
              </li>
              <li>
                <a href="#">شرایط استفاده</a>
              </li>
              <li>
                <a href="#">حریم خصوصی</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="widget-menu widget card">
            <header class="card-header">
              <h3 class="card-title">با تاپ کالا</h3>
            </header>
            <ul class="footer-menu">
              <li>
                <a href="#">فروش در تاپ کالا</a>
              </li>
              <li>
                <a href="#">همکاری با سازمان‌ها</a>
              </li>
              <li>
                <a href="#">فرصت‌های شغلی</a>
              </li>
              <li>
                <a href="#">تماس با تاپ کالا</a>
              </li>
              <li>
                <a href="#">درباره تاپ کالا</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3 newsletter-wrapper">
          <div class="newsletter">
            <p>از تخفیف‌ها و جدیدترین‌های فروشگاه باخبر شوید:</p>
            <form action="">
              <input
                type="email"
                class="email-input"
                value={email}
                onChange={(e) => {
                 setEmail(e.target.value)  
                } }
                placeholder="آدرس ایمیل خود را وارد کنید..."
               
              ></input>
              <input
                type="button"
                class="btn btn-primary"
                value="ارسال"
                onClick={(e)=> mailSubscription(e)}
              ></input>
            </form>
          </div>
          <div class="socials">
            <p>ما را در شبکه های اجتماعی دنبال کنید.</p>
            <div class="footer-social">
              <ul class="text-center social-icons">
                <li className="instagram-icon">
                  <a href="#">
                    <HoverTooltip title="اینستاگرام">
                      <InstagramIcon />
                    </HoverTooltip>
                  </a>
                </li>

                <li className="telegram-icon">
                  <a href="#">
                    <HoverTooltip title="تلگرام">
                      <TelegramIcon />
                    </HoverTooltip>
                  </a>
                </li>

                <li className="facebook-icon">
                  <a href="#">
                    <HoverTooltip title="فیس‌بوک">
                      <FacebookIcon />
                    </HoverTooltip>
                  </a>
                </li>

                <li className="x-icon">
                  <a href="#">
                    <HoverTooltip title="توییتر">
                      <XIcon />
                    </HoverTooltip>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
