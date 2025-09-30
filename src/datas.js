import LaptopIcon from '@mui/icons-material/Laptop';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const users = [
  {
    id: 1,
    email: "ali.rezaei@example.com",
    bankNumber: 5859831033756478,
    idCartNumber: 2370987645,
    phone: "09123456789",
    password: "hashed_password_123", // در عمل باید هش‌شده باشد (مثل bcrypt)
    username: "alirezaei",
    fullName: "علی رضایی",
    createdAt: "2024-01-10T10:00:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSJ9.1234567890abcdef", // نمونه توکن
  },
  {
    id: 2,
    email: "sara.karimi@example.com",
    bankNumber: 5859831044756478,
    idCartNumber: 2350987456,
    phone: "09129876543",
    password: "hashed_password_456",
    username: "sarakarimi",
    fullName: "سارا کریمی",
    createdAt: "2024-02-15T12:30:00Z",
    role: "admin",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mn0.abcdef1234567890",
  },
  {
    id: 3,
    email: "mohammad.hosseini@example.com",
    bankNumber: 5859831133755478,
    idCartNumber: 2380314679,
    phone: "09121234567",
    password: "hashed_password_789",
    username: "mohammadh",
    fullName: "محمد حسینی",
    createdAt: "2024-03-20T09:15:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6M30.7890abcdef123456",
  },
  {
    id: 4,
    email: "narges.mohammadi@example.com",
    bankNumber: 5859831563745478,
    idCartNumber: 2370765237,
    phone: "09127654321",
    password: "hashed_password_101",
    username: "nargesm",
    fullName: "نرگس محمدی",
    createdAt: "2024-04-05T14:20:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NH0.4567890abcdef123",
  },
  {
    id: 5,
    email: "reza.yazdani@example.com",
    bankNumber: 5859833456756478,
    idCartNumber: 2370745237,
    phone: "09122345678",
    password: "hashed_password_202",
    username: "rezayazdani",
    fullName: "رضا یزدانی",
    createdAt: "2024-05-12T11:45:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NX0.123abcdef4567890",
  },
  {
    id: 6,
    email: "fateme.ahmadi@example.com",
    bankNumber: 5859831033753452,
    idCartNumber: 2350765237,
    phone: "09128765432",
    password: "hashed_password_303",
    username: "fatemeahmadi",
    fullName: "فاطمه احمدی",
    createdAt: "2024-06-18T16:00:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nn0.789123456abcdef0",
  },
  {
    id: 7,
    email: "hassan.shariati@example.com",
    bankNumber: 5859831033734478,
    idCartNumber: 2330746527,
    phone: "09123487654",
    password: "hashed_password_404",
    username: "hassansh",
    fullName: "حسن شریعتی",
    createdAt: "2024-07-22T08:30:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6N30.456123789abcdef0",
  },
  {
    id: 8,
    email: "zahra.gholami@example.com",
    bankNumber: 5859841033756478,
    idCartNumber: 2370746347,
    phone: "09126543210",
    password: "hashed_password_505",
    username: "zahragh",
    fullName: "زهرا غلامی",
    createdAt: "2024-08-30T13:10:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OH0.123456abcdef7890",
  },
  {
    id: 9,
    email: "amir.kazemi@example.com",
    bankNumber: 5859831033456478,
    idCartNumber: 2370723527,
    phone: "09127894561",
    password: "hashed_password_606",
    username: "amirkazemi",
    fullName: "امیر کاظمی",
    createdAt: "2024-09-15T17:25:00Z",
    role: "admin",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OX0.789456123abcdef0",
  },
  {
    id: 10,
    email: "leila.mirzaei@example.com",
    bankNumber: 5859831033756578,
    idCartNumber: 2370346523,
    phone: "09129012345",
    password: "hashed_password_707",
    username: "leilamirzaei",
    fullName: "لیلا میرزایی",
    createdAt: "2024-10-01T10:50:00Z",
    role: "user",
    isForeign: false,
    newsletter: false,
    card: [
      { title: "بانک ملی", cardNum: 5859831033759233, logo: "/img/bank/melli.jpg" }
    ],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTB9.456789123abcdef0",
  },
];

const shopProducts = [
  {
    id: 1,
    productCode: "1001MN",
    name: "مانتو زنانه",
    category: "لباس زنانه",
    model: "کلاسیک",
    price: 157000,
    image: "/img/products/07.jpg",
    rating: 5.0,
    discount: "20",
    salesCount: 420,
    info: "مانتو زنانه با طراحی کلاسیک، جنس کتان با کیفیت بالا، مناسب برای استفاده رسمی و روزمره.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید کرمی"] },
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی نفتی"] }
    ],
    suggeted: false,
  },
  {
    id: 2,
    productCode: "1002TV",
    name: "تلویزیون LED",
    category: "دستگاه‌های دیجیتال",
    model: "4K اسمارت",
    price: 15000000,
    image: "/img/products/04.jpg",
    rating: 4.7,
    discount: "10",
    salesCount: 520,
    info: "تلویزیون 55 اینچ LED با رزولوشن 4K، پشتیبانی از وای‌فای و اپلیکیشن‌های استریمینگ.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی متالیک"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },
  {
    id: 3,
    productCode: "1003WM",
    name: "ماشین لباسشویی",
    category: "لوازم خانگی",
    model: "اتوماتیک",
    price: 12000000,
    image: "/img/products/washing-machine-01.jpg",
    rating: 4.2,
    discount: null,
    info: "ماشین لباسشویی 7 کیلوگرمی با 12 برنامه شستشو، کم‌مصرف و مناسب برای خانواده‌های متوسط.",
    colors: [
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای تیره"] }
    ],
    suggeted: false,
  },
  {
    id: 4,
    productCode: "1004SM",
    name: "گوشی هوشمند",
    category: "دستگاه‌های دیجیتال",
    model: "پرو",
    price: 18000000,
    image: "/img/products/023.jpg",
    rating: 4.8,
    discount: "5",
    salesCount: 210,
    info: "گوشی هوشمند با دوربین 64 مگاپیکسل، باتری 5000 میلی‌آمپر و پردازنده قدرتمند.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی گرافیت"] },
      { color: "آبی", subcolor: ["آبی یخی", "آبی تیره"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید براق"] }
    ],
    suggeted: false,
  },
  {
    id: 5,
    productCode: "1005TS",
    name: "تیشرت ورزشی مردانه",
    category: "لباس ورزشی",
    model: "اسپرت",
    price: 85000,
    image: "/img/products/018.jpg",
    rating: 4.0,
    discount: "15",
    salesCount: 320,
    info: "تیشرت ورزشی سبک با جنس پلی‌استر و پنبه، تنفس‌پذیر و مناسب برای تمرینات ورزشی.",
    colors: [
      { color: "قرمز", subcolor: ["قرمز تیره", "قرمز روشن"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی خاکستری"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },
  {
    id: 6,
    productCode: "1006BL",
    name: "بلندر آشپزخانه",
    category: "لوازم آشپزخانه",
    model: "چندکاره",
    price: 2500000,
    image: "/img/products/kitchen-blender-01.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 435,
    info: "بلندر 800 واتی با تیغه‌های استیل ضدزنگ، مناسب برای تهیه اسموتی و خرد کردن مواد غذایی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قرمز", subcolor: ["قرمز متالیک", "قرمز تیره"] },
      { color: "استیل", subcolor: ["استیل براق", "استیل مات"] }
    ],
    suggeted: false,
  },
  {
    id: 7,
    productCode: "1007NB",
    name: "دفترچه یادداشت",
    category: "لوازم تحریر",
    model: "فانتزی",
    price: 35000,
    image: "/img/products/notebook-01.jpg",
    rating: 3.8,
    discount: null,
    salesCount: 200,
    info: "دفترچه یادداشت 100 برگ با جلد سخت و طراحی فانتزی، مناسب برای دانشجویان و دانش‌آموزان.",
    colors: [
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی تیره"] },
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی پاستلی"] },
      { color: "سبز", subcolor: ["سبز نعنایی", "سبز زیتونی"] }
    ],
    suggeted: false,
  },


  {
    id: 8,
    productCode: "1008TY",
    name: "ماشین اسباب‌بازی",
    category: "اسباب‌بازی",
    model: "کنترلی",
    price: 450000,
    image: "/img/products/car-toy-01.jpg",
    rating: 4.3,
    discount: "5",
    salesCount: 110,
    info: "ماشین کنترلی با باتری قابل شارژ، مناسب برای کودکان بالای 6 سال و بازی‌های فضای باز.",
    colors: [
      { color: "قرمز", subcolor: ["قرمز براق", "قرمز مات"] },
      { color: "مشکی", subcolor: ["مشکی متالیک", "مشکی تیره"] },
      { color: "زرد", subcolor: ["زرد لیمویی", "زرد خردلی"] }
    ],
    suggeted: false,
  },


  {
    id: 9,
    productCode: "1009CR",
    name: "روکش صندلی خودرو",
    category: "لوازم خودرو",
    model: "اسپرت",
    price: 650000,
    image: "/img/products/car-chair-cover-01.jpg",
    rating: 4.1,
    discount: null,
    salesCount: 245,
    info: "روکش صندلی با جنس چرم مصنوعی، مقاوم در برابر سایش و مناسب برای انواع خودرو.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی طرح‌دار"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 10,
    productCode: "1010NK",
    name: "گردنبند نقره",
    category: "جواهرات",
    model: "مینیمال",
    price: 350000,
    image: "/img/products/necklace-noghre-01.jpg",
    rating: 4.6,
    discount: "15",
    salesCount: 1780,
    info: "گردنبند نقره با طراحی مینیمال، مناسب برای استفاده روزمره و هدیه دادن.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "طلایی", subcolor: ["طلایی رز", "طلایی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 11,
    productCode: "1011JK",
    name: "کت مردانه",
    category: "لباس مردانه",
    model: "رسمی",
    price: 450000,
    image: "/img/products/men-casual-close-01.jpg",
    rating: 4.4,
    discount: "10",
    salesCount: 130,
    info: "کت مردانه تک با دوخت تمیز، جنس پشمی، مناسب برای جلسات کاری و مراسم رسمی.",
    colors: [
      { color: "سرمه‌ای", subcolor: ["سرمه‌ای تیره", "سرمه‌ای روشن"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 12,
    productCode: "1012FR",
    name: "یخچال فریزر",
    category: "لوازم خانگی",
    model: "دو درب",
    price: 20000000,
    image: "/img/products/freezer-01.jpg",
    rating: 4.6,
    discount: "8",
    salesCount: 177,
    info: "یخچال فریزر 28 فوت با سیستم بدون برفک، کم‌مصرف و مناسب برای خانواده‌های بزرگ.",
    colors: [
      { color: "استیل", subcolor: ["استیل براق", "استیل مات"] },
      { color: "سفید", subcolor: ["سفید براق", "سفید صدفی"] }
    ],
    suggeted: false,
  },


  {
    id: 13,
    productCode: "1013HP",
    name: "هدفون بلوتوثی",
    category: "دستگاه‌های دیجیتال",
    model: "بی‌سیم",
    price: 1500000,
    image: "/img/products/headphone-bluetuth-01.jpg",
    rating: 4.3,
    discount: "12",
    salesCount: 134,
    info: "هدفون بلوتوثی با کیفیت صدای استریو، باتری 20 ساعته، مناسب برای موسیقی و گیمینگ.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "قرمز", subcolor: ["قرمز تیره", "قرمز روشن"] }
    ],
    suggeted: false,
  },


  {
    id: 14,
    productCode: "1014CM",
    name: "قهوه‌ساز",
    category: "لوازم آشپزخانه",
    model: "اتوماتیک",
    price: 1800000,
    image: "/img/products/coffee-machine-01.jpg",
    rating: 4.4,
    discount: "5",
    salesCount: 189,
    info: "قهوه‌ساز 1000 واتی با مخزن 1.5 لیتری، مناسب برای تهیه قهوه فیلتری در منزل.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 15,
    productCode: "1015SP",
    name: "کفش ورزشی زنانه",
    category: "لباس ورزشی",
    model: "راحتی",
    price: 950000,
    image: "/img/products/women-sport-shoe-01.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 456,
    info: "کفش ورزشی با زیره فوم سبک، مناسب برای دویدن و تمرینات روزانه.",
    colors: [
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی نئونی"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] }
    ],
    suggeted: true,
  },


  {
    id: 16,
    productCode: "1016PN",
    name: "خودکار رنگی",
    category: "لوازم تحریر",
    model: "فانتزی",
    price: 25000,
    image: "/img/products/pen-01.jpg",
    rating: 3.7,
    discount: null,
    salesCount: 430,
    info: "ست خودکار رنگی با جوهر روان، مناسب برای یادداشت‌برداری و طراحی.",
    colors: [
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] },
      { color: "قرمز", subcolor: ["قرمز روشن", "قرمز تیره"] },
      { color: "سبز", subcolor: ["سبز روشن", "سبز تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 17,
    productCode: "1017DL",
    name: "عروسک خرس",
    category: "اسباب‌بازی",
    model: "نرم",
    price: 200000,
    image: "/img/products/bear-toy-01.jpg",
    rating: 4.2,
    discount: "5",
    salesCount: 150,
    info: "عروسک خرس نرم با جنس پلی‌استر، مناسب برای کودکان و هدیه دادن.",
    colors: [
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای روشن", "قهوه‌ای تیره"] },
      { color: "سفید", subcolor: ["سفید کرمی", "سفید صدفی"] }
    ],
    suggeted: true,
  },


  {
    id: 18,
    productCode: "1018CH",
    name: "شارژر فندکی",
    category: "لوازم خودرو",
    model: "فست شارژ",
    price: 150000,
    image: "/img/products/charger-01.jpg",
    rating: 4.0,
    discount: null,
    salesCount: 5,
    info: "شارژر فندکی با دو پورت USB، پشتیبانی از شارژ سریع، مناسب برای انواع گوشی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 19,
    productCode: "1019WT",
    name: "ساعت مچی مردانه",
    category: "جواهرات",
    model: "کلاسیک",
    price: 1200000,
    image: "/img/products/men-watch-01.jpg",
    rating: 4.7,
    discount: "15",
    salesCount: 50,
    info: "ساعت مچی با بند چرم و صفحه ضدخش، مناسب برای استفاده روزمره و رسمی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای تیره", "قهوه‌ای روشن"] }
    ],
    suggeted: true,
  },


  {
    id: 20,
    productCode: "1020HD",
    name: "سشوار حرفه‌ای",
    category: "لوازم شخصی",
    model: "قدرتمند",
    price: 800000,
    image: "/img/products/hair-dry-01.jpg",
    rating: 4.3,
    discount: "10",
    salesCount: 190,
    info: "سشوار 2200 واتی با سه حالت حرارتی، مناسب برای استفاده خانگی و حرفه‌ای.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید براق"] }
    ],
    suggeted: true,
  },


  {
    id: 21,
    productCode: "1021DR",
    name: "لباس مجلسی زنانه",
    category: "لباس زنانه",
    model: "مجلسی",
    price: 350000,
    image: "/img/products/women-casual-dress-01.jpg",
    rating: 4.8,
    discount: "15",
    salesCount: 213,
    info: "لباس مجلسی زنانه با جنس حریر و دانتل، مناسب برای مراسم عروسی و مهمانی‌های رسمی.",
    colors: [
      { color: "قرمز", subcolor: ["قرمز مخملی", "قرمز روشن"] },
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید براق"] }
    ],
    suggeted: false,
  },


  {
    id: 22,
    productCode: "1022LP",
    name: "لپ‌تاپ گیمینگ",
    category: "دستگاه‌های دیجیتال",
    model: "حرفه‌ای",
    price: 35000000,
    image: "/img/products/02.jpg",
    rating: 4.9,
    discount: "5",
    salesCount: 341,
    info: "لپ‌تاپ گیمینگ با پردازنده Core i7، گرافیک RTX 3060 و صفحه 144Hz.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی متالیک"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 23,
    productCode: "1023VC",
    name: "جاروبرقی",
    category: "لوازم خانگی",
    model: "بدون کیسه",
    price: 4500000,
    image: "/img/products/jaroo-barghi-01.jpg",
    rating: 4.3,
    discount: "10",
    salesCount: 238,
    info: "جاروبرقی 2000 واتی با فناوری بدون کیسه، مناسب برای نظافت سریع و آسان.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قرمز", subcolor: ["قرمز تیره", "قرمز روشن"] }
    ],
    suggeted: false,
  },


  {
    id: 24,
    productCode: "1024SH",
    name: "پیراهن مردانه",
    category: "لباس مردانه",
    model: "کژوال",
    price: 120000,
    image: "/img/products/men-shirt-02.jpg",
    rating: 4.1,
    discount: "12",
    salesCount: 521,
    info: "پیراهن مردانه با جنس کتان، مناسب برای استفاده روزمره و محیط‌های غیررسمی.",
    colors: [
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 25,
    productCode: "1025MW",
    name: "مایکروویو",
    category: "لوازم آشپزخانه",
    model: "دیجیتال",
    price: 3500000,
    image: "/img/products/macrowave-01.jpg",
    rating: 4.4,
    discount: "8",
    salesCount: 324,
    info: "مایکروویو 25 لیتری با 10 برنامه پخت، مناسب برای گرم کردن و پخت غذاهای متنوع.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای براق"] }
    ],
    suggeted: false,
  },


  {
    id: 26,
    productCode: "1026LG",
    name: "لگ ورزشی زنانه",
    category: "لباس ورزشی",
    model: "اسپرت",
    price: 180000,
    image: "/img/products/women-sport-leg-01.jpg",
    rating: 4.2,
    discount: "10",
    salesCount: 783,
    info: "لگ ورزشی با جنس کشسان و تنفس‌پذیر، مناسب برای یوگا و تمرینات ورزشی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "بنفش", subcolor: ["بنفش روشن", "بنفش تیره"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 27,
    productCode: "1027BK",
    name: "کتاب آموزشی",
    category: "لوازم تحریر",
    model: "آموزشی",
    price: 80000,
    image: "/img/products/learning-book-01.jpg",
    rating: 3.9,
    discount: null,
    salesCount: 672,
    info: "کتاب آموزشی با محتوای کاربردی، مناسب برای دانشجویان و علاقه‌مندان به یادگیری.",
    colors: [
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی تیره"] },
      { color: "قرمز", subcolor: ["قرمز روشن", "قرمز تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 28,
    productCode: "1028PZ",
    name: "پازل 1000 تکه",
    category: "اسباب‌بازی",
    model: "فکری",
    price: 250000,
    image: "/img/products/puzzle1000-01.jpg",
    rating: 4.0,
    discount: "5",
    salesCount: 321,
    info: "پازل 1000 تکه با طرح منظره، مناسب برای سرگرمی بزرگسالان و کودکان بالای 10 سال.",
    colors: [
      { color: "چندرنگ", subcolor: ["چندرنگ روشن", "چندرنگ تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 29,
    productCode: "1029MT",
    name: "تشک خودرو",
    category: "لوازم خودرو",
    model: "استاندارد",
    price: 400000,
    image: "/img/products/car-toshak-01.jpg",
    rating: 4.1,
    discount: null,
    salesCount: 420,
    info: "تشک خودرو با جنس لاستیک مقاوم، مناسب برای محافظت از کف خودرو.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی طرح‌دار"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 30,
    productCode: "1030ER",
    name: "گوشواره نقره",
    category: "جواهرات",
    model: "مینیمال",
    price: 200000,
    image: "/img/products/ear-gooshvare-01.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 1210,
    info: "گوشواره نقره با طراحی ساده، مناسب برای استفاده روزمره و هدیه دادن.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "طلایی", subcolor: ["طلایی رز", "طلایی براق"] }
    ],
    suggeted: true,
  },


  {
    id: 31,
    productCode: "1031BL",
    name: "بلوز زنانه",
    category: "لباس زنانه",
    model: "راحت",
    price: 110000,
    image: "/img/products/women-blooz-01.jpg",
    rating: 3.8,
    discount: "15",
    salesCount: 260,
    info: "بلوز زنانه با جنس نخی، سبک و مناسب برای استفاده روزمره و غیررسمی.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی تیره"] },
      { color: "آبی", subcolor: ["آبی پاستلی", "آبی روشن"] }
    ],
    suggeted: true,
  },


  {
    id: 32,
    productCode: "1032TB",
    name: "تبلت",
    category: "دستگاه‌های دیجیتال",
    model: "استاندارد",
    price: 8000000,
    image: "/img/products/tablet-01.jpg",
    rating: 4.4,
    discount: "7",
    salesCount: 820,
    info: "تبلت 10 اینچی با حافظه 64 گیگابایت، مناسب برای مطالعه و کار روزمره.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 33,
    productCode: "1033RF",
    name: "یخچال ساید بای ساید",
    category: "لوازم خانگی",
    model: "لوکس",
    price: 45000000,
    image: "/img/products/freezer-02.jpg",
    rating: 4.8,
    discount: "5",
    salesCount: 730,
    info: "یخچال ساید بای ساید 32 فوت با آب‌سردکن و سیستم خنک‌کننده پیشرفته.",
    colors: [
      { color: "استیل", subcolor: ["استیل براق", "استیل مات"] },
      { color: "مشکی", subcolor: ["مشکی متالیک", "مشکی مات"] }
    ],
    suggeted: false,
  },


  {
    id: 34,
    productCode: "1034JN",
    name: "شلوار جین مردانه",
    category: "لباس مردانه",
    model: "اسلیم فیت",
    price: 220000,
    image: "/img/products/men-jean-02.jpg",
    rating: 4.2,
    discount: "10",
    salesCount: 430,
    info: "شلوار جین با جنس دنیم باکیفیت، مناسب برای استایل کژوال و روزمره.",
    colors: [
      { color: "آبی", subcolor: ["آبی تیره", "آبی روشن"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی زغالی"] }
    ],
    suggeted: false,
  },


  {
    id: 35,
    productCode: "1035KT",
    name: "کتری برقی",
    category: "لوازم آشپزخانه",
    model: "بی‌سیم",
    price: 900000,
    image: "/img/products/ketri-barghi-01.jpg",
    rating: 4.3,
    discount: null,
    salesCount: 562,
    info: "کتری برقی 1.7 لیتری با بدنه استیل، مناسب برای جوشاندن سریع آب.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] }
    ],
    suggeted: false,
  },


  {
    id: 36,
    productCode: "1036SP",
    name: "کفش ورزشی مردانه",
    category: "لباس ورزشی",
    model: "حرفه‌ای",
    price: 1200000,
    image: "/img/products/men-sport-shoe-02.jpg",
    rating: 4.6,
    discount: "12",
    salesCount: 70,
    info: "کفش ورزشی با زیره ضدلغزش، مناسب برای دویدن و ورزش‌های سنگین.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "قرمز", subcolor: ["قرمز تیره", "قرمز روشن"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] }
    ],
    suggeted: false,
  },


  {
    id: 37,
    productCode: "1037PC",
    name: "مدادرنگی 24 رنگ",
    category: "لوازم تحریر",
    model: "حرفه‌ای",
    price: 60000,
    image: "/img/products/color-pencil-24-01.jpg",
    rating: 4.0,
    discount: "5",
    salesCount: 110,
    info: "مدادرنگی با کیفیت بالا، مناسب برای طراحی و نقاشی حرفه‌ای.",
    colors: [
      { color: "چندرنگ", subcolor: ["چندرنگ روشن", "چندرنگ تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 38,
    productCode: "1038RB",
    name: "ربات اسباب‌بازی",
    category: "اسباب‌بازی",
    model: "آموزشی",
    price: 600000,
    image: "/img/products/toy-robot-01.jpg",
    rating: 4.4,
    discount: "10",
    salesCount: 170,
    info: "ربات اسباب‌بازی با قابلیت برنامه‌ریزی، مناسب برای آموزش کدنویسی به کودکان.",
    colors: [
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] },
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] }
    ],
    suggeted: false,
  },


  {
    id: 39,
    productCode: "1039SG",
    name: "عینک آفتابی",
    category: "جواهرات",
    model: "کلاسیک",
    price: 500000,
    image: "/img/products/sunglasses-01.jpg",
    rating: 4.3,
    discount: "15",
    salesCount: 327,
    info: "عینک آفتابی با لنز UV400، مناسب برای رانندگی و استفاده روزمره.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای تیره", "قهوه‌ای روشن"] }
    ],
    suggeted: true,
  },


  {
    id: 40,
    productCode: "1040ET",
    name: "مسواک برقی",
    category: "لوازم شخصی",
    model: "هوشمند",
    price: 700000,
    image: "/img/products/tooth-01.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 120,
    info: "مسواک برقی با 3 حالت تمیزکنندگی، مناسب برای بهداشت دهان و دندان.",
    colors: [
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 41,
    productCode: "1041SK",
    name: "دامن زنانه",
    category: "لباس زنانه",
    model: "کژوال",
    price: 95000,
    image: "/img/products/women-daman-01.jpg",
    rating: 4.0,
    discount: "10",
    salesCount: 170,
    info: "دامن زنانه با جنس جین، طراحی ساده و مناسب برای استایل‌های روزمره.",
    colors: [
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی طرح‌دار"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 42,
    productCode: "1042SW",
    name: "سویشرت مردانه",
    category: "لباس مردانه",
    model: "اسپرت",
    price: 140000,
    image: "/img/products/swishirt-men-01.jpg",
    rating: 3.8,
    discount: null,
    salesCount: 238,
    info: "سویشرت مردانه با کلاه، جنس ترکیبی پنبه و پلی‌استر، مناسب برای ورزش و استفاده روزمره.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی خاکستری"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] },
      { color: "سرمه‌ای", subcolor: ["سرمه‌ای روشن", "سرمه‌ای تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 43,
    productCode: "1043SP",
    name: "کفش ورزشی مردانه",
    category: "لباس ورزشی",
    model: "راحتی",
    price: 850000,
    image: "/img/products/men-sport-shoe-03.jpg",
    rating: 4.4,
    discount: "15",
    salesCount: 310,
    info: "کفش ورزشی با زیره فوم سبک، مناسب برای دویدن و تمرینات روزانه.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قرمز", subcolor: ["قرمز تیره", "قرمز روشن"] }
    ],
    suggeted: true,
  },


  {
    id: 44,
    productCode: "1044TB",
    name: "تبلت گرافیکی",
    category: "دستگاه‌های دیجیتال",
    model: "حرفه‌ای",
    price: 12000000,
    image: "/img/products/tablet-02.jpg",
    rating: 4.6,
    discount: "5",
    salesCount: 350,
    info: "تبلت گرافیکی با قلم حساس به فشار، مناسب برای طراحی دیجیتال و هنرمندان.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی متالیک"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 45,
    productCode: "1045AC",
    name: "کولر گازی",
    category: "لوازم خانگی",
    model: "اینورتر",
    price: 25000000,
    image: "/img/products/cooler-01.png",
    rating: 4.7,
    discount: "8",
    salesCount: 780,
    info: "کولر گازی 18000 BTU با فناوری اینورتر، کم‌مصرف و مناسب برای فضاهای متوسط.",
    colors: [
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای تیره"] }
    ],
    suggeted: true,
  },


  {
    id: 46,
    productCode: "1046FP",
    name: "غذاساز",
    category: "لوازم آشپزخانه",
    model: "چندکاره",
    price: 3200000,
    image: "/img/products/cooking-machine-01.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 340,
    info: "غذاساز 700 واتی با 8 عملکرد، مناسب برای خرد کردن، مخلوط کردن و رنده کردن.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قرمز", subcolor: ["قرمز متالیک", "قرمز تیره"] },
      { color: "استیل", subcolor: ["استیل براق", "استیل مات"] }
    ],
    suggeted: false,
  },


  {
    id: 47,
    productCode: "1047PN",
    name: "ماژیک وایت‌برد",
    category: "لوازم تحریر",
    model: "استاندارد",
    price: 30000,
    image: "/img/products/mazhik-01.jpg",
    rating: 3.9,
    discount: null,
    salesCount: 111,
    info: "ماژیک وایت‌برد با جوهر قابل پاک شدن، مناسب برای تدریس و جلسات.",
    colors: [
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] },
      { color: "قرمز", subcolor: ["قرمز روشن", "قرمز تیره"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 48,
    productCode: "1048LG",
    name: "لگو ساختنی",
    category: "اسباب‌بازی",
    model: "فکری",
    price: 350000,
    image: "/img/products/lego-01.png",
    rating: 4.2,
    discount: "5",
    salesCount: 8,
    info: "لگو 500 تکه با طرح شهر، مناسب برای کودکان بالای 6 سال و تقویت خلاقیت.",
    colors: [
      { color: "چندرنگ", subcolor: ["چندرنگ روشن", "چندرنگ تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 49,
    productCode: "1049TL",
    name: "جعبه ابزار خودرو",
    category: "لوازم خودرو",
    model: "کامل",
    price: 750000,
    image: "/img/products/jabe-abzar-01.jpg",
    rating: 4.3,
    discount: null,
    salesCount: 18,
    info: "جعبه ابزار کامل با آچار و پیچ‌گوشتی، مناسب برای تعمیرات خودرو.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی متالیک"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 50,
    productCode: "1050BR",
    name: "دستبند چرم",
    category: "جواهرات",
    model: "اسپرت",
    price: 250000,
    image: "/img/products/dastband-01.jpg",
    rating: 4.4,
    discount: "10",
    salesCount: 189,
    info: "دستبند چرم با طراحی اسپرت، مناسب برای استفاده روزمره و استایل‌های کژوال.",
    colors: [
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای تیره", "قهوه‌ای روشن"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 51,
    productCode: "1051TS",
    name: "تیشرت زنانه",
    category: "لباس زنانه",
    model: "کژوال",
    price: 70000,
    image: "/img/products/women-tshirt-01.jpg",
    rating: 3.7,
    discount: "15",
    salesCount: 361,
    info: "تیشرت زنانه سبک با جنس 100% پنبه، مناسب برای استفاده روزمره و غیررسمی.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی تیره"] },
      { color: "آبی", subcolor: ["آبی پاستلی", "آبی روشن"] }
    ],
    suggeted: false,
  },


  {
    id: 52,
    productCode: "1052SM",
    name: "ساعت هوشمند",
    category: "دستگاه‌های دیجیتال",
    model: "فیتنس",
    price: 4500000,
    image: "/img/products/smart-watch-01.jpg",
    rating: 4.5,
    discount: "12",
    salesCount: 783,
    info: "ساعت هوشمند با قابلیت پایش ضربان قلب و گام‌شمار، مناسب برای ورزش و سلامت.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "آبی", subcolor: ["آبی یخی", "آبی تیره"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 53,
    productCode: "1053FN",
    name: "پنکه رومیزی",
    category: "لوازم خانگی",
    model: "قابل حمل",
    price: 600000,
    image: "/img/products/desk-panke-01.jpg",
    rating: 4.1,
    discount: "5",
    salesCount: 440,
    info: "پنکه رومیزی با 3 سرعت، کم‌صدا و مناسب برای استفاده در منزل و محل کار.",
    colors: [
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 54,
    productCode: "1054SH",
    name: "شلوارک ورزشی مردانه",
    category: "لباس ورزشی",
    model: "اسپرت",
    price: 100000,
    image: "/img/products/men-tshirt-01.jpg",
    rating: 4.0,
    discount: "10",
    salesCount: 444,
    info: "شلوارک ورزشی با جنس پلی‌استر، سبک و مناسب برای ورزش و فعالیت‌های فضای باز.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی خاکستری"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] },
      { color: "آبی", subcolor: ["آبی روشن", "آبی تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 55,
    productCode: "1055TS",
    name: "تستر نان",
    category: "لوازم آشپزخانه",
    model: "دیجیتال",
    price: 1200000,
    image: "/img/products/toaster-01.jpg",
    rating: 4.3,
    discount: null,
    salesCount: 220,
    info: "تستر نان 800 واتی با 7 درجه برشته کردن، مناسب برای صبحانه‌های سریع.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] }
    ],
    suggeted: false,
  },


  {
    id: 56,
    productCode: "1056MN",
    name: "مانتو زنانه",
    category: "لباس زنانه",
    model: "مدرن",
    price: 180000,
    image: "/img/products/mantoo-01.jpg",
    rating: 4.2,
    discount: "20",
    salesCount: 116,
    info: "مانتو زنانه با طراحی مدرن و مینیمال، جنس پارچه ترکیبی، مناسب برای استایل‌های امروزی.",
    colors: [
      { color: "کرم", subcolor: ["کرم روشن", "کرم تیره"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 57,
    productCode: "1057BG",
    name: "کوله‌پشتی مدرسه",
    category: "لوازم تحریر",
    model: "فانتزی",
    price: 250000,
    image: "/img/products/kooleposhti-01.jpg",
    rating: 4.1,
    discount: "10",
    salesCount: 119,
    info: "کوله‌پشتی با جنس برزنت، جادار و مناسب برای دانش‌آموزان.",
    colors: [
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی تیره"] },
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی تیره"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی طرح‌دار"] }
    ],
    suggeted: false,
  },


  {
    id: 58,
    productCode: "1058DL",
    name: "عروسک پاندا",
    category: "اسباب‌بازی",
    model: "نرم",
    price: 180000,
    image: "/img/products/Toy-panda-01.jpg",
    rating: 4.0,
    discount: "5",
    salesCount: 447,
    info: "عروسک پاندا نرم با جنس پلی‌استر، مناسب برای کودکان و هدیه دادن.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید کرمی"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 59,
    productCode: "1059SN",
    name: "سنسور پارک",
    category: "لوازم خودرو",
    model: "هوشمند",
    price: 300000,
    image: "/img/products/car-parking-sensor-01.png",
    rating: 4.2,
    discount: null,
    salesCount: 674,
    info: "سنسور پارک با دقت بالا، مناسب برای پارک آسان در فضاهای تنگ.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 60,
    productCode: "1060WT",
    name: "ساعت مچی زنانه",
    category: "جواهرات",
    model: "لوکس",
    price: 1500000,
    image: "/img/products/women-watch-03.jpg",
    rating: 4.8,
    discount: "15",
    salesCount: 145,
    info: "ساعت مچی زنانه با نگین‌کاری و بند استیل، مناسب برای مهمانی‌ها و استفاده رسمی.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "طلایی", subcolor: ["طلایی رز", "طلایی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 61,
    productCode: "1061DR",
    name: "لباس راحتی زنانه",
    category: "لباس زنانه",
    model: "کژوال",
    price: 90000,
    image: "/img/products/women-comfort-clothe-01.jpg",
    rating: 4.1,
    discount: "10",
    salesCount: 176,
    info: "لباس راحتی زنانه با جنس نخی، سبک و مناسب برای استفاده خانگی.",
    colors: [
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی پاستلی"] },
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی روشن"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 62,
    productCode: "1062SH",
    name: "کفش رسمی مردانه",
    category: "لباس مردانه",
    model: "کلاسیک",
    price: 300000,
    image: "/img/products/men-casual-shoe-02.jpg",
    rating: 4.3,
    discount: "12",
    salesCount: 180,
    info: "کفش رسمی مردانه با جنس چرم مصنوعی، مناسب برای جلسات کاری و مراسم رسمی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای تیره", "قهوه‌ای روشن"] }
    ],
    suggeted: false,
  },


  {
    id: 63,
    productCode: "1063SP",
    name: "شلوارک ورزشی زنانه",
    category: "لباس ورزشی",
    model: "اسپرت",
    price: 120000,
    image: "/img/products/women-sport-skirt-01.jpg",
    rating: 4.0,
    discount: "15",
    salesCount: 220,
    info: "شلوارک ورزشی با جنس پلی‌استر، سبک و مناسب برای ورزش و فعالیت‌های فضای باز.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی خاکستری"] },
      { color: "بنفش", subcolor: ["بنفش روشن", "بنفش تیره"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 64,
    productCode: "1064SP",
    name: "هدفون بی‌سیم",
    category: "دستگاه‌های دیجیتال",
    model: "حرفه‌ای",
    price: 2000000,
    image: "/img/products/headphone-bluetuth-02.jpg",
    rating: 4.5,
    discount: "10",
    salesCount: 555,
    info: "هدفون بی‌سیم با کیفیت صدای استریو و حذف نویز، مناسب برای موسیقی و گیمینگ.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "سفید", subcolor: ["سفید صدفی", "سفید مات"] },
      { color: "آبی", subcolor: ["آبی یخی", "آبی تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 65,
    productCode: "1065FN",
    name: "پنکه سقفی",
    category: "لوازم خانگی",
    model: "مدرن",
    price: 2500000,
    image: "/img/products/panke-saghti-01.jpg",
    rating: 4.4,
    discount: "8",
    salesCount: 650,
    info: "پنکه سقفی با 3 سرعت و نور LED، مناسب برای اتاق‌های بزرگ و دکوراسیون مدرن.",
    colors: [
      { color: "سفید", subcolor: ["سفید براق", "سفید مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 66,
    productCode: "1066CM",
    name: "چای‌ساز",
    category: "لوازم آشپزخانه",
    model: "دیجیتال",
    price: 1500000,
    image: "/img/products/Tea-boiler-01.jpg",
    rating: 4.2,
    discount: "5",
    salesCount: 223,
    info: "چای‌ساز 1.8 لیتری با بدنه شیشه‌ای و تنظیم دما، مناسب برای تهیه چای و دمنوش.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 67,
    productCode: "1067NB",
    name: "دفتر مشق",
    category: "لوازم تحریر",
    model: "استاندارد",
    price: 40000,
    image: "/img/products/daftar-mashgh-01.jpg",
    rating: 3.9,
    discount: null,
    salesCount: 118,
    info: "دفتر مشق 80 برگ با کاغذ باکیفیت، مناسب برای دانش‌آموزان و یادداشت‌برداری.",
    colors: [
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی تیره"] },
      { color: "قرمز", subcolor: ["قرمز روشن", "قرمز تیره"] },
      { color: "سبز", subcolor: ["سبز نعنایی", "سبز زیتونی"] }
    ],
    suggeted: false,
  },


  {
    id: 68,
    productCode: "1068TY",
    name: "عروسک خرگوش",
    category: "اسباب‌بازی",
    model: "نرم",
    price: 220000,
    image: "/img/products/toy-rabbit-01.jpg",
    rating: 4.3,
    discount: "5",
    salesCount: 180,
    info: "عروسک خرگوش نرم با جنس پلی‌استر، مناسب برای کودکان و هدیه دادن.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید کرمی"] },
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 69,
    productCode: "1069CR",
    name: "نگهدارنده گوشی خودرو",
    category: "لوازم خودرو",
    model: "مغناطیسی",
    price: 180000,
    image: "/img/products/phone-holder-01.jpg",
    rating: 4.1,
    discount: null,
    salesCount: 897,
    info: "نگهدارنده گوشی مغناطیسی با نصب آسان، مناسب برای رانندگی ایمن.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ]
  }

]


const categoryItems = [
  {
    id: 1,
    icon: '/img/category/notebook-computer.png',
    title: 'کالای دیجیتال',
    categoryCount: 156000,
  },
  {
    id: 2,
    icon: '/img/category/lifeline-in-a-heart-outline.png',
    title: 'آرایشی، بهداشتی و سلامت',
    categoryCount: 48000,
  },
  {
    id: 3,
    icon: '/img/category/repair-tools.png',
    title: 'خودرو،ابزار و اداری',
    categoryCount: 56000,
  },
  {
    id: 4,
    icon: '/img/category/hanbok.png',
    title: 'مد و پوشاک',
    categoryCount: 217000,
  },
  {
    id: 5,
    icon: '/img/category/sofa.png',
    title: 'خانه و آشپزخانه',
    categoryCount: 229000,
  },
  {
    id: 6,
    icon: '/img/category/school-material.png',
    title: 'لوازم تحریر و هنر',
    categoryCount: 86000,
  },
  {
    id: 7,
    icon: '/img/category/baby-girl.png',
    title: 'کودک و نوزاد',
    categoryCount: 32000,
  },
  {
    id: 8,
    icon: '/img/category/adventurer.png',
    title: 'ورزش و سفر',
    categoryCount: 15000,
  },
  {
    id: 9,
    icon: '/img/category/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle.png',
    title: 'خوردنی و آشامیدنی',
    categoryCount: 22000,
  },
];


const offerProducts = [
  {
    id: 1,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 200000,
    rating: 4,
    img: "/img/products/017.jpg"
  },
  {
    id: 2,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 140000,
    rating: 2,
    img: "/img/products/020.jpg"
  },
  {
    id: 3,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 250000,
    rating: 4,
    img: "/img/products/014.jpg"
  },
  {
    id: 4,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 400000,
    rating: 3,
    img: "/img/products/016.jpg"
  },
  {
    id: 5,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 320000,
    rating: 5,
    img: "/img/products/018.jpg"
  },
  {
    id: 6,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 240000,
    rating: 1,
    img: "/img/products/015.jpg"
  },
  {
    id: 7,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 160000,
    rating: 3,
    img: "/img/products/017.jpg"
  },
  {
    id: 8,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 190000,
    rating: 5,
    img: "/img/products/020.jpg"
  },
  {
    id: 9,
    name: "کت مردانه مجلسی مدل k-m-5110",
    price: 199000,
    rating: 3,
    img: "/img/products/014.jpg"
  }
];

let historyProducts = [
  {
    id: 1,
    productCode: "1058DL",
    name: "عروسک پاندا",
    category: "اسباب‌ بازی",
    model: "نرم",
    price: 180000,
    image: "/img/products/panda.jpg",
    rating: 4.0,
    discount: "5",
    salesCount: 120,
    info: "عروسک پاندا نرم با جنس پلی‌استر، مناسب برای کودکان و هدیه دادن.",
    colors: [
      { color: "سفید", subcolor: ["سفید صدفی", "سفید کرمی"] },
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 2,
    productCode: "1059SN",
    name: "سنسور پارک",
    category: "لوازم خودرو",
    model: "هوشمند",
    price: 300000,
    image: "/img/products/sensor-park.jpg",
    rating: 4.2,
    discount: null,
    info: "سنسور پارک با دقت بالا، مناسب برای پارک آسان در فضاهای تنگ.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی براق"] },
      { color: "نقره‌ای", subcolor: ["نقره‌ای متالیک", "نقره‌ای مات"] }
    ],
    suggeted: false,
  },


  {
    id: 3,
    productCode: "1060WT",
    name: "ساعت مچی زنانه",
    category: "جواهرات",
    model: "لوکس",
    price: 1500000,
    image: "/img/products/women-watch-02.jpg",
    rating: 4.8,
    discount: "25",
    salesCount: 120,
    info: "ساعت مچی زنانه با نگین‌کاری و بند استیل، مناسب برای مهمانی‌ها و استفاده رسمی.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "طلایی", subcolor: ["طلایی رز", "طلایی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 4,
    productCode: "1060WT",
    name: "ساعت مچی زنانه",
    category: "جواهرات",
    model: "لوکس",
    price: 1500000,
    image: "/img/products/women-watch-01.jpg",
    rating: 3,
    discount: "15",
    salesCount: 170,
    info: "ساعت مچی زنانه با نگین‌کاری و بند استیل، مناسب برای مهمانی‌ها و استفاده رسمی.",
    colors: [
      { color: "نقره‌ای", subcolor: ["نقره‌ای براق", "نقره‌ای مات"] },
      { color: "طلایی", subcolor: ["طلایی رز", "طلایی براق"] }
    ],
    suggeted: false,
  },


  {
    id: 5,
    productCode: "1061DR",
    name: "لباس راحتی زنانه",
    category: "لباس زنانه",
    model: "کژوال",
    price: 90000,
    image: "/img/products/comfort-women-close-01.jpg",
    rating: 2,
    discount: "10",
    salesCount: 120,
    info: "لباس راحتی زنانه با جنس نخی، سبک و مناسب برای استفاده خانگی.",
    colors: [
      { color: "صورتی", subcolor: ["صورتی روشن", "صورتی پاستلی"] },
      { color: "آبی", subcolor: ["آبی آسمانی", "آبی روشن"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ],
    suggeted: false,
  },


  {
    id: 6,
    productCode: "1062SH",
    name: "کفش رسمی مردانه",
    category: "لباس مردانه",
    model: "کلاسیک",
    price: 300000,
    image: "/img/products/men-casual-shoe-01.jpg",
    rating: 5,
    discount: "12",
    salesCount: 120,
    info: "کفش رسمی مردانه با جنس چرم مصنوعی، مناسب برای جلسات کاری و مراسم رسمی.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی براق", "مشکی مات"] },
      { color: "قهوه‌ای", subcolor: ["قهوه‌ای تیره", "قهوه‌ای روشن"] }
    ],
    suggeted: false,
  },


  {
    id: 7,
    productCode: "1063SP",
    name: "شلوارک ورزشی زنانه",
    category: "لباس ورزشی",
    model: "اسپرت",
    price: 120000,
    image: "/img/products/women-sport-short-01.jpg",
    rating: 3,
    discount: "15",
    salesCount: 120,
    info: "شلوارک ورزشی با جنس پلی‌استر، سبک و مناسب برای ورزش و فعالیت‌های فضای باز.",
    colors: [
      { color: "مشکی", subcolor: ["مشکی مات", "مشکی خاکستری"] },
      { color: "بنفش", subcolor: ["بنفش روشن", "بنفش تیره"] },
      { color: "خاکستری", subcolor: ["خاکستری روشن", "خاکستری تیره"] }
    ]
  }
]

const comments = [
  {
    id: 1,
    userId: 10,
    productId: 1,
    text: "کیفیت کت خیلی خوبه، ارزش خرید داره!",
    rating: 4,
    status: 1,
    createdAt: "2024-11-01T14:00:00Z"
  },
  {
    id: 2,
    userId: 2,
    productId: 3,
    text: "رنگش با تصویر فرق داره، ولی دوخت خوبی داره.",
    rating: 3,
    status: 0,
    createdAt: "2024-11-02T10:30:00Z"
  },
  {
    id: 3,
    userId: 3,
    productId: 5,
    text: "عالیه، خیلی شیکه!",
    rating: 5,
    status: 1,
    createdAt: "2024-11-03T12:15:00Z"
  },
  {
    id: 4,
    userId: 4,
    productId: 2,
    text: "قیمتش مناسبه ولی جنسش معمولیه.",
    rating: 2,
    status: 0,
    createdAt: "2024-11-04T16:20:00Z"
  },
  {
    id: 5,
    userId: 5,
    productId: 7,
    text: "راضی‌ام، به موقع تحویل شد.",
    rating: 3,
    status: 1,
    createdAt: "2024-11-05T09:45:00Z"
  },
  {
    id: 6,
    userId: 10,
    productId: 2,
    text: "راضی‌ نیستم، به موقع تحویل شد.",
    rating: 3,
    status: 1,
    createdAt: "2024-11-05T09:45:00Z"
  }

]
const images = [
  "/img/main-slider/img-slider-2/1.jpg",
  "/img/main-slider/img-slider-2/2.jpg",
  "/img/main-slider/img-slider-2/3.jpg",
  "/img/main-slider/img-slider-2/4.jpg",
  "/img/main-slider/img-slider-2/5.jpg",
  "/img/main-slider/img-slider-2/6.jpg",
  "/img/main-slider/img-slider-2/7.jpg",
];

const topSliderAsideImages = [
  "/img/banner/sidebar-banner-1.gif",
  "/img/banner/sidebar-banner-2.jpg",
];

// داده‌های نمونه محصولات

const brandImages = [
  "/img/brand/1076.png",
  "/img/brand/1078.png",
  "/img/brand/1080.png",
  "/img/brand/2315.png",
  "/img/brand/1086.png",
  "/img/brand/5189.png",
  "/img/brand/1000006973.png",
  "/img/brand/1000014452.jpg"
];


const banners = [
  {
    id: 1,
    title: "تخفیف ویژه گوشی‌های هوشمند",
    productCategory: "گوشی",
    discount: 20,
    image: "/img/banner/medium-banner-1.jpg",
    category: "mediume"
  },
  {
    id: 2,
    title: "فروش لوازم خانگی",
    productCategory: "لوازم خانگی",
    discount: 15,
    image: "/img/banner/medium-banner-2.jpg",
    category: "medium"
  },
  {
    id: 3,
    title: "تخفیف ویژه لوازم آرایشی",
    productCategory: "لوازم ارایشی",
    discount: 25,
    image: "/img/banner/small-banner-1.jpg",
    category: "small"
  },
  {
    id: 4,
    title: "فروش ویژه لباس‌های زنانه",
    productCategory: "پوشاک",

    discount: 30,
    image: "/img/banner/small-banner-5.jpg",
    category: "small"
  },
  {
    id: 5,
    title: "تخفیف ویژه لوازم ورزشی",
    productCategory: "ورزش و سفر",

    discount: 10,
    image: "/img/banner/small-banner-3.jpg",
    category: "small"
  },
  {
    id: 6,
    title: "فروش ویژه لوازم جانبی",
    productCategory: "لوازم جانبی",

    discount: 5,
    image: "/img/banner/small-banner-4.jpg",
    category: "small"
  },
  {
    id: 7,
    title: " ابزار سلامت دیجیتال  ",
    productCategory: "گجت و  لوازم دیجیتال",

    discount: 20,
    image: "/img/banner/large-banner.jpg",
    category: "large"
  },

]






const userOrders = [
  {
    id: "DDC-57456951",
    orderNumber: "DDC-57456951",
    orderDate: "1398/05/31",
    payableAmount: 0,
    totalAmount: 9989000,
    status: "لغو شده",
  },
  {
    id: "DKC-45173498",
    orderNumber: "DKC-45173498",
    orderDate: "1398/03/10",
    payableAmount: 0,
    totalAmount: 18049000,
    status: "لغو شده",
  },
  {
    id: "DDC-58976951",
    orderNumber: "DDC-58976951",
    orderDate: "1398/05/21",
    payableAmount: 0,
    totalAmount: 9189000,
    status: "لغو شده",
  },
  {
    id: "ABC-12345678",
    orderNumber: "ABC-12345678",
    orderDate: "1399/01/15",
    payableAmount: 2500000,
    totalAmount: 7500000,
    status: "در انتظار پرداخت",
  },
  {
    id: "XYZ-98765432",
    orderNumber: "XYZ-98765432",
    orderDate: "1399/07/22",
    payableAmount: 0,
    totalAmount: 12499000,
    status: "تکمیل شده",
  },
  {
    id: "DDC-45678912",
    orderNumber: "DDC-45678912",
    orderDate: "1399/09/10",
    payableAmount: 0,
    totalAmount: 3499000,
    status: "تکمیل شده",
  },
  {
    id: "KLM-34567890",
    orderNumber: "KLM-34567890",
    orderDate: "1400/02/05",
    payableAmount: 1200000,
    totalAmount: 8200000,
    status: "در انتظار پرداخت",
  },
  {
    id: "RST-56789012",
    orderNumber: "RST-56789012",
    orderDate: "1400/04/18",
    payableAmount: 0,
    totalAmount: 15999000,
    status: "لغو شده",
  },
  {
    id: "PQR-78901234",
    orderNumber: "PQR-78901234",
    orderDate: "1400/06/30",
    payableAmount: 0,
    totalAmount: 6499000,
    status: "تکمیل شده",
  },
  {
    id: "UVW-90123456",
    orderNumber: "UVW-90123456",
    orderDate: "1400/08/12",
    payableAmount: 500000,
    totalAmount: 10999000,
    status: "در انتظار پرداخت",
  },
];

const categories = [
  {
    name: "کالای دیجیتال",
    subItems: [
      { title: true, label: "لپتاپ", link: "/test" },
      { title: false, label: "کیف و کاور گوشی", link: "/test" },
      { title: false, label: "پاور بانک (شارژر همراه)", link: "/test" },
      { title: false, label: "پایه نگهدارنده گوشی", link: "/test" },
      { title: true, label: "گوشی موبایل", link: "/test" },
      { title: false, label: "سامسونگ", link: "/test" },
      { title: false, label: "هوآوی", link: "/test" },
      { title: false, label: "اپل", link: "/test" },
      { title: false, label: "شیائومی", link: "/test" },
      { title: false, label: "آنر", link: "/test" },
      { title: false, label: "نوکیا", link: "/test" },
      { title: true, label: "واقعیت مجازی", link: "/test" },
      { title: true, label: "مچ‌بند و ساعت هوشمند", link: "/test" },
      { title: true, label: "هدفون، هدست، هندزفری", link: "/test" },
      { title: true, label: "اسپیکر بلوتوث و با سیم", link: "/test" },
      { title: true, label: "هارد، فلش و SSD", link: "/test" },
      { title: true, label: "دوربین", link: "/test" },
      { title: false, label: "دوربین عکاسی دیجیتال", link: "/test" },
      { title: false, label: "دوربین‌ ورزشی و فیلم برداری", link: "/test" },
    ],
  },
  {
    name: "خودرو، ابزار و تجهیزات صنعتی",
    subItems: [
      { title: true, label: "لوازم مصرفی خودرو", link: "/test" },
      { title: false, label: "روغن موتور", link: "/test" },
      { title: false, label: "فیلتر ها", link: "/test" },
      { title: false, label: "باتری", link: "/test" },
      { title: true, label: "لوازم یدکی خودرو", link: "/test" },
      { title: false, label: "لوازم بدنه", link: "/test" },
      { title: false, label: "چراغ", link: "/test" },
      { title: false, label: "آینه", link: "/test" },
      { title: false, label: "لوازم مکانیکی", link: "/test" },
      { title: false, label: "فن کولر", link: "/test" },
      { title: true, label: "لوازم جانبی خودرو", link: "/test" },
      { title: false, label: "روکش", link: "/test" },
      { title: false, label: "کف پوش", link: "/test" },
      { title: false, label: "زنجیر چرخ", link: "/test" },
      { title: false, label: "عایق موتور", link: "/test" },
      { title: false, label: "پا رکابی", link: "/test" },
    ],
  },
  {
    name: "مد و پوشاک",
    subItems: [
      { title: true, label: "پوشاک مردانه", link: "/test" },
      { title: false, label: "تیشرت", link: "/test" },
      { title: false, label: "شلوار", link: "/test" },
      { title: false, label: "کفش", link: "/test" },
      { title: true, label: "پوشاک زنانه", link: "/test" },
      { title: false, label: "تیشرت", link: "/test" },
      { title: false, label: "شلوار", link: "/test" },
      { title: false, label: "لباس زیر", link: "/test" },
      { title: false, label: "جوراب", link: "/test" },
      { title: false, label: "پوشاک بچگانه", link: "/test" },
      { title: false, label: "شلوارک", link: "/test" },
      { title: false, label: "دمپایی", link: "/test" },
      { title: false, label: "شرت", link: "/test" },
      { title: true, label: "لباس دخترانه", link: "/test" },
      { title: true, label: "لباس پسرانه", link: "/test" },
      { title: true, label: "پوشاک فری سایز", link: "/test" },
      { title: true, label: "برندها", link: "/test" },
    ],
  },
  {
    name: "زیبایی و سلامت",
    subItems: [
      { title: true, label: "لوازم آرایش", link: "/test" },
      { title: false, label: "کیف و کاور گوشی", link: "/test" },
      { title: false, label: "پاور بانک (شارژر همراه)", link: "/test" },
      { title: false, label: "پایه نگهدارنده گوشی", link: "/test" },
      { title: true, label: "لوازم بهداشتی", link: "/test" },
      { title: false, label: "سامسونگ", link: "/test" },
      { title: false, label: "هوآوی", link: "/test" },
      { title: false, label: "اپل", link: "/test" },
      { title: true, label: "مراقبت پوست و مو", link: "/test" },
      { title: true, label: "عطر و ادکلن", link: "/test" },
      { title: true, label: "لوازم شخصی برقی", link: "/test" },
    ],
  },
  {
    name: "خانه و آشپزخانه",
    subItems: [
      { title: true, label: "ظروف پخت و پز", link: "/test" },
      { title: true, label: "حمام", link: "/test" },
      { title: true, label: "سرویس بهداشتی", link: "/test" },
      { title: false, label: "دکوراسیون", link: "/test" },
    ],
  },
  {
    name: "کتاب، لوازم تحریر و هنر",
    subItems: [
      { title: false, label: "کتاب و مجله", link: "/test" },
      { title: false, label: "کاغذ چاپ عکس", link: "/test" },
      { title: false, label: "دفترچه", link: "/test" },
      { title: true, label: "محبوب‌ترین آثار", link: "/test" },
      { title: false, label: "کافکا", link: "/test" },
      { title: false, label: "صادق هدایت", link: "/test" },
      { title: false, label: "شاملو", link: "/test" },
      { title: false, label: "اندره ژید", link: "/test" },
      { title: true, label: "آلات موسیقی", link: "/test" },
      { title: false, label: "گیتار", link: "/test" },
      { title: false, label: "پیانو", link: "/test" },
      { title: false, label: "سنتور", link: "/test" },
      { title: false, label: "ساکسیفون", link: "/test" },
      { title: false, label: "ساز نقاره", link: "/test" },
      { title: true, label: "صنایع دستی", link: "/test" },
      { title: true, label: "فرش ماشینی", link: "/test" },
      { title: true, label: "لوازم تحریر", link: "/test" },
    ],
  },
  {
    name: "اسباب بازی، کودک و نوزاد",
    subItems: [
      { title: true, label: "بهداشت و حمام کودک و نوزاد", link: "/test" },
      { title: false, label: "پوشک", link: "/test" },
      { title: false, label: "وان", link: "/test" },
      { title: false, label: "مینی واش", link: "/test" },
      { title: false, label: "حوله", link: "/test" },
      { title: true, label: "اسباب بازی", link: "/test" },
      { title: false, label: "فکری", link: "/test" },
      { title: false, label: "ماشین بازی", link: "/test" },
      { title: false, label: "عروسک", link: "/test" },
      { title: true, label: "خواب کودک", link: "/test" },
      { title: false, label: "تخت", link: "/test" },
      { title: false, label: "بالشت", link: "/test" },
      { title: false, label: "پتو", link: "/test" },
      { title: false, label: "شبخواب", link: "/test" },
      { title: true, label: "خلاقیت", link: "/test" },
      { title: true, label: "سلامت کودک", link: "/test" },
    ],
  },
  {
    name: "ورزش و سفر",
    subItems: [
      { title: true, label: "پوشاک ورزشی مردانه", link: "/test" },
      { title: false, label: "کفش کوهنوردی", link: "/test" },
      { title: false, label: "شلوار کوهنوردی", link: "/test" },
      { title: false, label: "دستکش", link: "/test" },
      { title: true, label: "پوشاک ورزشی زنانه", link: "/test" },
      { title: false, label: "کفش", link: "/test" },
      { title: false, label: "شلوار", link: "/test" },
      { title: false, label: "روسری", link: "/test" },
      { title: false, label: "هدبند", link: "/test" },
      { title: false, label: "قمقمه", link: "/test" },
      { title: true, label: "ورزش‌های توپی", link: "/test" },
      { title: true, label: "اسکوتر برقی", link: "/test" },
    ],
  },
  {
    name: "سوپر مارکت آنلاین",
    subItems: [
      { title: true, label: "صبحانه", link: "/test" },
      { title: false, label: "پنیر", link: "/test" },
      { title: false, label: "شیر", link: "/test" },
      { title: true, label: "ناهار", link: "/test" },
      { title: false, label: "ساندویچ", link: "/test" },
      { title: false, label: "نان", link: "/test" },
      { title: false, label: "سوسیس", link: "/test" },
      { title: false, label: "نوشابه", link: "/test" },
    ],
  },
];

const megaMenuCategories = [
  {
    id: 1,
    name: 'کالای دیجیتال',
    icon: <LaptopIcon />,
    content: [
      { title: 'لپتاپ', items: ['لپتاپ'] },
      { title: 'گوشی موبایل', items: ['سامسونگ', 'هوآوی', 'اپل', 'شیائومی', 'آنر', 'نوکیا'] },
      { title: 'لوازم جانبی', items: ['کیف و کاور گوشی', 'پاور بانک (شارژر همراه)', 'پایه نگهدارنده گوشی'] },
      { title: 'واقعیت مجازی', items: [] },
      { title: 'مچ‌بند و ساعت هوشمند', items: [] },
      { title: 'هدفون، هدست، هندزفری', items: [] },
      { title: 'اسپیکر بلوتوث و با سیم', items: [] },
      { title: 'هارد، فلش و SSD', items: [] },
      { title: 'دوربین', items: ['دوربین عکاسی دیجیتال', 'دوربین ورزشی و فیلم‌برداری'] },
    ],
  },
  {
    id: 2,
    name: 'خودرو، ابزار و تجهیزات صنعتی',
    icon: <CarRepairIcon />,
    content: [
      { title: 'لوازم مصرفی خودرو', items: ['روغن موتور', 'فیلترها', 'باتری'] },
      { title: 'لوازم یدکی خودرو', items: ['لوازم بدنه', 'چراغ', 'آینه', 'لوازم مکانیکی', 'فن کولر'] },
      { title: 'لوازم جانبی خودرو', items: ['روکش', 'کف‌پوش', 'زنجیر چرخ', 'عایق موتور', 'پارکابی'] },
    ],
  },
  {
    id: 3,
    name: 'مد و پوشاک',
    icon: <CheckroomIcon />,
    content: [
      { title: 'پوشاک مردانه', items: ['تیشرت', 'شلوار', 'کفش'] },
      { title: 'پوشاک زنانه', items: ['تیشرت', 'شلوار', 'لباس زیر', 'جوراب'] },
      { title: 'پوشاک بچگانه', items: ['شلوارک', 'دمپایی', 'شرت'] },
      { title: 'لباس دخترانه', items: [] },
      { title: 'لباس پسرانه', items: [] },
      { title: 'پوشاک فری‌سایز', items: [] },
      { title: 'برندها', items: [] },
    ],
  },
  {
    id: 4,
    name: 'زیبایی و سلامت',
    icon: <HealthAndSafetyIcon />,
    content: [
      { title: 'لوازم آرایش', items: ['کیف و کاور گوشی', 'پاور بانک (شارژر همراه)', 'پایه نگهدارنده گوشی'] },
      { title: 'لوازم بهداشتی', items: ['سامسونگ', 'هوآوی', 'اپل'] },
      { title: 'مراقبت پوست و مو', items: [] },
      { title: 'عطر و ادکلن', items: [] },
      { title: 'لوازم شخصی برقی', items: [] },
    ],
  },
  {
    id: 5,
    name: 'خانه و آشپزخانه',
    icon: <HomeIcon />,
    content: [
      { title: 'ظروف پخت و پز', items: [] },
      { title: 'حمام', items: [] },
      { title: 'سرویس بهداشتی', items: [] },
      { title: 'دکوراسیون', items: [] },
    ],
  },
  {
    id: 6,
    name: 'کتاب، لوازم تحریر و هنر',
    icon: <BookIcon />,
    content: [
      { title: 'کتاب و مجله', items: ['کاغذ چاپ عکس', 'دفترچه'] },
      { title: 'محبوب‌ترین آثار', items: ['کافکا', 'صادق هدایت', 'شاملو', 'اندره ژید'] },
      { title: 'آلات موسیقی', items: ['گیتار', 'پیانو', 'سنتور', 'ساکسیفون', 'ساز نقاره'] },
      { title: 'صنایع دستی', items: [] },
      { title: 'فرش ماشینی', items: [] },
      { title: 'لوازم تحریر', items: [] },
    ],
  },
  {
    id: 7,
    name: 'اسباب‌بازی، کودک و نوزاد',
    icon: <ChildCareIcon />,
    content: [
      { title: 'بهداشت و حمام کودک و نوزاد', items: ['پوشک', 'وان', 'مینی‌واش', 'حوله'] },
      { title: 'اسباب‌بازی', items: ['فکری', 'ماشین بازی', 'عروسک'] },
      { title: 'خواب کودک', items: ['تخت', 'بالشت', 'پتو', 'شب‌خواب'] },
      { title: 'خلاقیت', items: [] },
      { title: 'سلامت کودک', items: [] },
    ],
  },
  {
    id: 8,
    name: 'ورزش و سفر',
    icon: <SportsSoccerIcon />,
    content: [
      { title: 'پوشاک ورزشی مردانه', items: ['کفش کوهنوردی', 'شلوار کوهنوردی', 'دستکش'] },
      { title: 'پوشاک ورزشی زنانه', items: ['کفش', 'شلوار', 'روسری', 'هدبند', 'قمقمه'] },
      { title: 'ورزش‌های توپی', items: [] },
      { title: 'اسکوتر برقی', items: [] },
    ],
  },
  {
    id: 9,
    name: 'سوپرمارکت آنلاین',
    icon: <ShoppingBasketIcon />,
    content: [
      { title: 'صبحانه', items: ['پنیر', 'شیر'] },
      { title: 'ناهار', items: ['ساندویچ', 'نان', 'سوسیس', 'نوشابه'] },
    ],
  },
];

const userCart = [
  {
    id: 1,
    title: "کت مردانه مجلسی مدل k-m-5110",
    price: 200000,
    rating: 4,
    quantity: 1,
    color: "black",

    img: "/img/products/017.jpg"
  },
  {
    id: 2,
    title: "کت مردانه مجلسی مدل k-m-5110",
    price: 140000,
    rating: 2,
    quantity: 2,
    color: "red",
    img: "/img/products/020.jpg"
  },
  {
    id: 3,
    title: "کت مردانه مجلسی مدل k-m-5110",
    price: 250000,
    rating: 4,
    quantity: 3,
    color: "blue",
    img: "/img/products/014.jpg"
  },

]



export {
  images,
  topSliderAsideImages,
  categoryItems,
  offerProducts,
  brandImages,
  banners,
  users,
  historyProducts,
  userOrders,
  categories,
  userCart,
  megaMenuCategories,
  comments,
  shopProducts
}