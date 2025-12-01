import { useMemo, useState } from "react";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import useUserOrders from "../../../../Hooks/useUserOrders";
import useAllProducts from "../../../../Hooks/useAllProducts";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

export default function OrdersPage() {
  const [tab, setTab] = useState(0);
  const { userOrders, userOrdersloading, userOrdersError } = useUserOrders();
  const { products } = useAllProducts();

  const activeOrders = userOrders.filter((o) => o.isActive === 1);
  const deliveredOrders = userOrders.filter((o) => o.isActive === 0);

  return (
    <div className="max-w-3xl w-full mx-auto p-4 font-sans">
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`flex-1 py-2 px-4 text-center font-semibold transition-all duration-300 rounded-t-md ${
            tab === 0
              ? "bg-white border-b-2 border-[#fa256c] text-[#fa256c]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab(0)}
        >
          جاری
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center font-semibold transition-all duration-300 rounded-t-md ${
            tab === 1
              ? "bg-white border-b-2 border-[#fa256c] text-[#fa256c]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab(1)}
        >
          تحویل شده
        </button>
      </div>

      {tab === 0 && (
        <OrderList
          orders={activeOrders}
          products={products}
          statusIcon={<LoopOutlinedIcon />}
          statusText="جاری"
          color="text-[#28a745]"
        />
      )}

      {tab === 1 && (
        <OrderList
          orders={deliveredOrders}
          products={products}
          statusIcon={<CheckCircleOutlinedIcon />}
          statusText="تحویل شده"
          color="text-[#28a745]"
        />
      )}
    </div>
  );
}

function OrderList({ orders, products, statusIcon, statusText, color }) {

  console.log("orders:", orders)
  console.log("products:", products)
  const payablePrice = useMemo(()=> {

  return orders.items.reduce((sum , item) =>  sum + item.price,0) 
   

  },[orders])


  if (!orders.length) {
    return <ErrorMessage msg={"سفارشی در این بخش وجود ندارد"} />;
  }

  console.log("payable price orders :",payablePrice)
  return (
    <ul className="list-none p-0 m-0 space-y-4">
      {orders.map((order) => (
        <li
          key={order.orderID}
          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <a
            href={`/profile/orders/${order.orderID}`}
            className="flex flex-col text-inherit no-underline p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center font-semibold text-gray-600 ${color}`}>
                {statusIcon}
                <span className="mr-1">{statusText}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700 mb-3">
              <div>{order.date.split("T")[0]}</div>
              <div>کد سفارش: {order.orderID}</div>
              <div className="flex items-center">
                مبلغ کل سفارش:
                <span className="font-bold mr-1 text-black">
                  {Number(payablePrice).toLocaleString("fa-IR")}
                </span>
                <span className="text-xs text-black mr-1">تومان</span>
              </div>
              <div className="w-full flex items-center gap-1">
                <img
                  src="/img/svg/club-point.svg"
                  alt="امتیاز"
                  className="w-4 h-4"
                />
                <span>امتیاز دیدی کلاب: ۲۹</span>
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-200 pt-3">
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productID);
                return (
                  <img
                    key={item.productID}
                    src={product ? `/img/products/${product.img}` : "#"}
                    alt={product ? product.name : "محصول"}
                    className="w-20 h-20 object-contain border border-gray-200 rounded-lg"
                  />
                );
              })}
            </div>

            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-end">
              <a
                href={`/profile/orders/${order.orderID}`}
                className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-all"
              >
                <svg className="w-5 h-5 fill-blue-600"></svg>
                <span>مشاهده فاکتور</span>
              </a>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
