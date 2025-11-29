import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./ShowSwal.css";

const MySwal = withReactContent(Swal);

const ShowSwal = ({
  title = " یک سوال",
  text = "موافقید؟ ",
  icon = "info", 
  showConfirmButton = true,
  confirmButtonText = "تأیید",
  confirmButtonColor = "#3085d6",
  showCancelButton = false,
  cancelButtonText = "لغو",
  cancelButtonColor = "#d33",
  customIcon = null, 
  onConfirm = () => {},
  onCancel = () => {},
  customClass = {}, 
  htmlContent = null, 
  timer = null, 
}) => {
  MySwal.fire({
    title,
    text: htmlContent ? undefined : text,
    icon: customIcon ? undefined : icon,
    iconHtml: customIcon
      ? `<img src="${customIcon}" style="width: 80px; height: 80px;" />`
      : undefined,
    html: htmlContent,
    showConfirmButton,
    confirmButtonText,
    confirmButtonColor,
    showCancelButton,
    cancelButtonText,
    cancelButtonColor,
    customClass: {
      confirmButton: customClass.confirmButton || "swal2-confirm",
      cancelButton: customClass.cancelButton || "swal2-cancel",
      title: customClass.title || "swal2-title",
      icon: customIcon ? "no-border" : customClass.icon || "swal2-icon",
    },
    timer,
    buttonsStyling: true,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
};

export default ShowSwal;
