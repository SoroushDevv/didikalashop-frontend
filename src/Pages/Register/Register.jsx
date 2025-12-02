import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import apiUtils from "../../Utils/ApiUtils";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
      .max(20, "نام کاربری نمی‌تواند بیشتر از 20 کاراکتر باشد")
      .required("نام کاربری اجباری است"),
    email: Yup.string().email("فرمت ایمیل نامعتبر است").required("ایمیل اجباری است"),
    phone: Yup.string()
      .matches(/^09[0-9]{9}$/, "شماره موبایل باید 11 رقم و با 09 شروع شود")
      .required("شماره موبایل اجباری است"),
    password: Yup.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد").required("رمز عبور اجباری است"),
    laws: Yup.bool().oneOf([true], "باید قوانین را بپذیرید"),
  });

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    laws: false,
    firstname: "",
    lastname: "",
    city: "",
    address: "",
    score: 0,
    buy: 0,
    cart: [],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setApiError(null);
      setApiSuccess(null);
      const userData = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        city: values.city,
        address: values.address,
        score: values.score,
        buy: values.buy,
        cart: values.cart,
      };
      const response = await apiUtils.users.register(userData);

      ShowSwal({
        title: "ثبت نام با موفقیت انجام شد!",
        text: "به دیدی کالا خوش آمدید :)",
        icon: "success",
      });
      setApiSuccess("ثبت نام با موفقیت انجام شد!");
      resetForm();
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404)
          setApiError("مسیر API یافت نشد. لطفاً مطمئن شوید سرور فعال است.");
        else if (err.response.status === 409)
          setApiError("نام کاربری یا ایمیل قبلاً استفاده شده است.");
        else if (err.response.status === 400)
          setApiError("اطلاعات ارسالی نامعتبر است.");
        else
          setApiError(`خطا در ثبت نام: ${err.response.data.message || err.message}`);
      } else setApiError("خطا در اتصال به سرور. لطفاً سرور را بررسی کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <img src="/img/logo.png" alt="logo" className="mx-auto w-36 drop-shadow-md" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">ثبت نام</h2>
            <p className="text-gray-500 text-sm mt-1">
              اگر قبلا با ایمیل ثبت‌نام کرده‌اید، نیاز به ثبت‌نام مجدد با شماره همراه ندارید.
            </p>
          </div>

          {apiSuccess && (
            <div className="bg-green-100 border border-green-300 text-green-700 rounded-md px-4 py-2 mb-4 text-sm">
              {apiSuccess}
            </div>
          )}
          {apiError && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-md px-4 py-2 mb-4 text-sm">
              {apiError}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-gray-600 font-medium mb-1">
                    نام کاربری
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="نام کاربری خود را وارد نمایید"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary-hover bg-gray-50"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-600 font-medium mb-1">
                    ایمیل
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="ایمیل خود را وارد نمایید"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary-hover bg-gray-50"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-600 font-medium mb-1">
                    شماره موبایل
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="شماره موبایل خود را وارد نمایید"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary-hover bg-gray-50"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-600 font-medium mb-1">
                    رمز عبور
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="رمز عبور خود را وارد نمایید"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary-hover bg-gray-50"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <Field type="checkbox" name="laws" id="laws" className="mr-2" />
                  <label htmlFor="laws">
                    <a href="#" className="text-brand-primary hover:underline">حریم خصوصی</a> و <a href="#" className="text-brand-primary hover:underline">شرایط و قوانین</a> را خوانده‌ام و می‌پذیرم.
                  </label>
                </div>
                <ErrorMessage name="laws" component="div" className="text-red-600 text-sm mt-1" />

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-primary-hover hover:from-brand-primary hover:to-brand-primary-hover text-white py-2 rounded-lg font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت نام"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-gray-600 text-sm mt-4">
            قبلا ثبت نام کرده‌اید؟ <Link to="/login" className="text-brand-primary font-medium hover:underline">ورود</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
