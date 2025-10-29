import "./UserOrderReturn.css"
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";

export default function UserOrderReturn() {
  const [returnProducts, setReturnProducts] = useState([]);
  const [returnHistory, setreturnHistory] = useState([]);

  return (
    <div className="return-section">
      {/* درخواست مرجوعی */}
      <div className="return-section__request">
        <h2 className="return-section__title">درخواست مرجوعی</h2>
        <div className="return-section__box">
          {returnProducts.length === 0 ? (
            <ErrorMessage msg="محصول مرجوعی یافت نشد" />
          ) : (
            <p className="return-section__message">
              در حال حاضر کالایی برای مرجوع کردن ندارید.
            </p>
          )}
        </div>
      </div>

      {/* تاریخچه مرجوعی */}
      <div className="return-section__history">
        <h2 className="return-section__title">تاریخچه مرجوعی</h2>
        <div className="return-section__box">
          {returnHistory.length === 0 ? (
            <ErrorMessage msg="خوشبختانه تا به حال کالایی را مرجوع نکرده‌اید و تاریخچه مرجوعی شما خالیست" />
          ) : (
            <p className="return-section__message">محل قرار گیری محصول مرجوعی</p>
          )}
        </div>
      </div>
    </div>

  );
}
