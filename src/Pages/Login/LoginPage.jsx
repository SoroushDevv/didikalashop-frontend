import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";
import { setAuthToken } from "../../Utils/AuthUtils";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "یوزرنیم باید حداقل 3 کاراکتر باشد")
    .matches(/^[a-zA-Z0-9_]+$/, "یوزرنیم فقط می‌تواند شامل حروف، اعداد و آندرلاین باشد")
    .required("یوزرنیم الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .required("رمز عبور الزامی است"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-6">
            <Link to="#">
              <img src="./img/logo.png" alt="logo" className="mx-auto w-32" />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">ورود</h2>

          <Formik
            initialValues={{ username: "", password: "", rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await api.post("/users/login", {
                  username: values.username,
                  password: values.password,
                });
                const { user, token } = response.data;

                if (user && token) {
                  Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "ورود با موفقیت انجام شد",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setAuthToken(token);
                  navigate("/");
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "خطا در احراز هویت",
                    text: "اطلاعات ورود نادرست است",
                  });
                }
              } catch (err) {
                Swal.fire({
                  icon: "error",
                  title: "خطا در ورود",
                  text: err.response?.data?.message || "مشکلی در سرور رخ داده است",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">نام کاربری</label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="username"
                      placeholder="نام کاربری خود را وارد نمایید"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <i className="mdi mdi-account-circle-outline absolute right-3 top-3 text-gray-400"></i>
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">رمز عبور</label>
                  <div className="relative">
                    <Field
                      type="password"
                      name="password"
                      placeholder="رمز عبور خود را وارد نمایید"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <i className="mdi mdi-lock-open-variant-outline absolute right-3 top-3 text-gray-400"></i>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="h-4 w-4 text-brand-primary rounded"
                  />
                  <label htmlFor="rememberMe" className="mr-2 text-gray-700">مرا به خاطر بسپار</label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary text-white py-2 rounded-lg hover:bg-brand-primary-hover transition"
                >
                  {isSubmitting ? "در حال ورود..." : "ورود به دیدیکالا"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center text-gray-600">
            <span>کاربر جدید هستید؟ </span>
            <Link to="/register" className="text-brand-primary hover:underline">ثبت نام در دیدیکالا</Link>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm space-y-2">
          <ul className="flex justify-center gap-4">
            <li><a href="#" className="hover:underline">درباره دیدیکالا</a></li>
            <li><a href="#" className="hover:underline">فرصت های شغلی</a></li>
            <li><a href="#" className="hover:underline">تماس با ما</a></li>
            <li><a href="#" className="hover:underline">همکاری با سازمان ها</a></li>
          </ul>
          <div>
            استفاده از مطالب فروشگاه اینترنتی دیدیکالا فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به فروشگاه آنلاین دیدیکالا می‌باشد.
          </div>
          <div>Copyright © 2019 Didikala</div>
        </footer>
      </div>
    </div>
  );
}
