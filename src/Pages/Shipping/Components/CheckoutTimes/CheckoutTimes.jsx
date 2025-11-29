import { useState, useEffect } from "react";
import moment from "moment-jalaali";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import "./CheckoutTimes.css";


const TabPanel = ({ value, index, children }) => {
  return (
    <div hidden={value !== index} className="p-4">
      {value === index && children}
    </div>
  );
};

const CheckoutTimes = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("1");
  const [tabsData, setTabsData] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});

  useEffect(() => {
  moment.loadPersian({ dialect: "persian-modern" });
}, []);

useEffect(() => {
    const savedTab = localStorage.getItem("tabValue");
    const savedTimeSlots = localStorage.getItem("selectedTimeSlot");
    const savedShipping = localStorage.getItem("selectedShipping");

    if (savedTab) setTabValue(Number(savedTab));
    if (savedTimeSlots) setSelectedTimeSlot(JSON.parse(savedTimeSlots));
    if (savedShipping) setSelectedShipping(savedShipping);
  }, []);

  useEffect(() => {
    const tomorrow = moment().add(1, "days");
    const dayAfterTomorrow = moment().add(2, "days");

    const daysData = [
      {
        raw: tomorrow.format("jYYYY/jMM/jDD"),
        day: tomorrow.format("dddd"),
        date: tomorrow.format("jD jMMMM"),
        timeSlots: [
          { id: "option1", label: "ساعت ۱۱ تا ۱۳" },
          { id: "option2", label: "ساعت ۱۳ تا ۱۵" },
        ],
      },
      {
        raw: dayAfterTomorrow.format("jYYYY/jMM/jDD"),
        day: dayAfterTomorrow.format("dddd"),
        date: dayAfterTomorrow.format("jD jMMMM"),
        timeSlots: [
          { id: "option3", label: "ساعت ۱ تا ۳" },
          { id: "option4", label: "ساعت ۱۳ تا ۱۵" },
          { id: "option5", label: "ساعت ۱۳ تا ۱۵" },
        ],
      },
      {
        raw: dayAfterTomorrow.clone().add(1, "days").format("jYYYY/jMM/jDD"),
        day: dayAfterTomorrow.clone().add(1, "days").format("dddd"),
        date: dayAfterTomorrow.clone().add(1, "days").format("jD jMMMM"),
        timeSlots: [],
        disabled: true,
      },
    ];

    setTabsData(daysData);

    setSelectedTimeSlot((prev) => ({
      ...prev,
      [0]: prev[0] || daysData[0].timeSlots[0]?.id,
    }));
  }, []);


  useEffect(() => {
    localStorage.setItem("tabValue", tabValue);
  }, [tabValue]);

  useEffect(() => {
    localStorage.setItem("selectedTimeSlot", JSON.stringify(selectedTimeSlot));
  }, [selectedTimeSlot]);

  useEffect(() => {
    localStorage.setItem("selectedShipping", selectedShipping);
  }, [selectedShipping]);



  const handleTabChange = (e, newValue) => {
    e.preventDefault();
    setTabValue(newValue);

    setSelectedTimeSlot({
      ...selectedTimeSlot,
      [newValue]: tabsData[newValue]?.timeSlots[0]?.id,
    });
  };

  const handleTimeSlotChange = (tabIndex, value) => {
    setSelectedTimeSlot({ ...selectedTimeSlot, [tabIndex]: value });
  };

  const shippingOptions = [
    {
      id: "1",
      deliveryRange: "از ۱۳ خرداد تا ۱۷ خرداد",
      method: "پست پیشتاز با ظرفیت اختصاصی برای دیجی کالا",
      cost: "رایگان",
    },
    {
      id: "2",
      deliveryRange: "از ۱۷ خرداد تا ۲۰ خرداد",
      method: "پست پیشتاز با ظرفیت اختصاصی برای دیجی کالا",
      cost: "رایگان",
    },
  ];

  const getSelectedShippingData = () =>
    shippingOptions.find((o) => o.id === selectedShipping) || {};

  const getSelectedTabData = () => {
    const selectedTab = tabsData[tabValue] || {};

    const selectedTime = selectedTab?.timeSlots?.find(
      (slot) => slot.id === selectedTimeSlot[tabValue]
    )?.label;

    return {
      day: selectedTab.day,
      date: selectedTab.date,
      timeSlot: selectedTime || "انتخاب نشده",
    };
  };

  return (
    <div className="checkout-times-container">

      <div className="w-full border-b">
        <div className="flex gap-2 p-3 overflow-x-auto">
          {tabsData.map((tab, i) => (
            <button
              type="button"
              key={i}
              onClick={(e) => handleTabChange(e, i)}
              className={`min-w-[100px] px-4 py-2 rounded-lg flex flex-col text-center 
                ${tabValue === i ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              <span>{tab.day}</span>
              <span className="text-sm">{tab.date}</span>
            </button>
          ))}
        </div>

        {tabsData.map((tab, i) => (
          <TabPanel key={i} value={tabValue} index={i}>
            <div className="flex flex-col gap-3">
              {tab.timeSlots.map((slot) => (
                <label
                  key={slot.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`time-${i}`}
                    value={slot.id}
                    checked={selectedTimeSlot[i] === slot.id}
                    onChange={(e) =>
                      handleTimeSlotChange(i, e.target.value)
                    }
                  />
                  <span>{slot.label}</span>
                </label>
              ))}
            </div>
          </TabPanel>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {shippingOptions.map((o) => (
          <label
            key={o.id}
            className="p-4 border rounded-xl flex items-start gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name="shipping"
              value={o.id}
              checked={selectedShipping === o.id}
              onChange={(e) => setSelectedShipping(e.target.value)}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <LocalShippingOutlinedIcon />
                <span className="font-semibold">
                  بازه تحویل سفارش: {o.deliveryRange}
                </span>
              </div>

              <ul className="text-sm mt-1">
                <li>شیوه ارسال: {o.method}</li>
                <li>هزینه ارسال: {o.cost}</li>
              </ul>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 border rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-bold mb-3">پیش‌فاکتور</h2>
        <hr className="mb-3" />

        <h3 className="font-semibold mb-2">اطلاعات تحویل:</h3>
        <ul className="text-sm mb-4">
          <li>روز تحویل: {getSelectedTabData().day}</li>
          <li>تاریخ تحویل: {getSelectedTabData().date}</li>
          <li>بازه زمانی: {getSelectedTabData().timeSlot}</li>
        </ul>

        <h3 className="font-semibold mb-2">اطلاعات ارسال:</h3>
        <ul className="text-sm">
          <li>بازه تحویل: {getSelectedShippingData().deliveryRange}</li>
          <li>شیوه ارسال: {getSelectedShippingData().method}</li>
          <li>هزینه ارسال: {getSelectedShippingData().cost}</li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutTimes;
