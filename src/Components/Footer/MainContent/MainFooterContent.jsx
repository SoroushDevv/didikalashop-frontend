import React from "react";
import Widgets from "./Widgets/Widgets";
import Services from "./Services/Services";
import "./MainFooterContent.css"
export default function MainFooterContent() {
  return (
    <div class="container main-container">
      <div class="footer-main-content">
      <Services />
      <Widgets />  
      </div>
      
    </div>
  );
}
