import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import { useCart } from "../../Contexts/CartContext";
import ErrorMessage from "./../ErrorMessage/ErrorMessage";
import Loader from "../../Components/Loader/Loader";

const colorMap = {
  مشکی: "#000000",
  سفید: "#FFFFFF",
  آبی: "#0000FF",
  قرمز: "#FF0000",
  نقرهای: "#C0C0C0",
  خاکستری: "#808080",
  زرد: "#FFFF00",
  صورتی: "#FF69B4",
  قهوه‌ای: "#A52A2A",
  شفاف: "transparent",
  چندرنگ: "#FFFFFF",
  بنفش: "#800080",
  سبز: "#008000",
};

const ColorChip = ({ color }) => {
  const hexColor = colorMap[color] || "#FFFFFF";
  const lightColors = ["#FFFFFF", "#FFFF00", "#FF69B4", "#C0C0C0", "transparent"];

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 shadow-sm relative"
        style={{ backgroundColor: hexColor }}
        title={color || "نامشخص"}
      >
        <CheckOutlinedIcon
          style={{
            color: lightColors.includes(hexColor) ? "#000" : "#fff",
            fontSize: 12,
            position: "absolute",
          }}
        />
      </div>
      <span className="text-sm text-gray-700">{color || "نامشخص"}</span>
    </div>
  );
};

export default function Cart() {
  const Navigate = useNavigate();
  const { order, setOrder, loading, error } = useCart();
  const [activeTab, setActiveTab] = useState("orders");



  useEffect(() => {

    if(order.items.length === 0) {
      Navigate("/")
    }
  },[order])

  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (productID, color) => {
    const item = order.items.find(
      (i) => i.productID === productID && i.color === color
    );
    if (!item)
      return ShowSwal({ title: "خطا", text: "محصول یافت نشد", icon: "error" });

    if (item.quantity >= item.product.count)
      return ShowSwal({
        title: "خطا",
        text: "موجودی محصول کافی نیست",
        icon: "error",
      });

    setOrder({
      ...order,
      items: order.items.map((i) =>
        i.productID === productID && i.color === color
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    });
  };

  const decreaseQuantity = (productID, color) => {
    setOrder({
      ...order,
      items: order.items.map((i) =>
        i.productID === productID && i.color === color
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
      ),
    });
  };

  const removeItem = (productID, color) => {
    ShowSwal({
      title: "حذف محصول؟",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      onConfirm: () => {
        setOrder({
          ...order,
          items: order.items.filter(
            (order) => !(order.productID === productID && order.color === color)
          ),
        });
        ShowSwal({ title: "حذف شد", icon: "success" });
      },
    });
  };

  if (loading)
    return <Loader/>;
  if (error)
    return <div className="text-center text-red-600 py-6">خطا: {error}</div>;

  return (
    <main className="container mx-auto p-4">
      <nav className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 border rounded-md font-medium transition ${
            activeTab === "orders"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          سبد خرید
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">ارسال عادی</span>
              <span className="text-sm text-gray-500">
                ({order.items.length} کالا)
              </span>
            </div>

            {order.items.length === 0 ? (
              <div className="flex flex-col items-center py-12">
                <ErrorMessage msg="سبد خرید خالی است" />
                <button
                  className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
                  onClick={() => Navigate("/")}
                >
                  بازگشت به خانه
                </button>
              </div>
            ) : (
              order.items.map((item) => (
                <div
                  key={item.productID}
                  className="flex flex-col md:flex-row gap-4 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 shadow-sm"
                >
                  <div className="w-28 flex-shrink-0">
                    <img
                      src={`/img/products/${item.product.img}`}
                      alt={item.product.title}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h2 className="font-bold text-sm text-gray-800 mb-1">
                      {item.product.title}
                    </h2>

                    <ul className="flex flex-col gap-2 mb-2 text-sm text-gray-600">
                      <li>
                        <ColorChip color={item.color} />
                      </li>
                      <li>گارانتی ۱۸ ماهه</li>
                      <li>نام فروشنده</li>
                      <li className="text-green-600">موجود در انبار</li>
                    </ul>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() =>
                              increaseQuantity(item.productID, item.color)
                            }
                          >
                            +
                          </button>
                          <input
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border-x border-gray-200 bg-transparent font-semibold"
                          />
                          <button
                            disabled={item.quantity === 1}
                            className={`px-3 py-1 ${
                              item.quantity === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              decreaseQuantity(item.productID, item.color)
                            }
                          >
                            -
                          </button>
                        </div>

                        <button
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium transition"
                          onClick={() =>
                            removeItem(item.productID, item.color)
                          }
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                          حذف
                        </button>
                      </div>

                      <div className="flex flex-col items-end">
                        <del className="text-red-500 text-sm">
                          {(
                            (item.price *
                              (item.product.discountPercent / 100)) *
                            item.quantity
                          ).toLocaleString()}{" "}
                          تومان
                        </del>
                        {item.product.hasDiscount && (
                          <span className="font-bold text-gray-800">
                            {(
                              item.price * item.quantity -
                              item.price *
                                item.quantity *
                                (item.product.discountPercent / 100)
                            ).toLocaleString()}{" "}
                            تومان
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:sticky top-6 h-fit">
          <CheckoutSummary totalAmount={totalAmount} />
        </div>
      </div>
    </main>
  );
}
