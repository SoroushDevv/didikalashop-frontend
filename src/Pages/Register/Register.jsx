import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import apiUtils from "../../Utils/ApiUtils";
import "./Register.css";

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
    <main className="register-page">
      <div className="register-container">
        <div className="register-card">
          {/* --- Header --- */}
          <div className="header">
            <div className="logo">
              <img src="/img/logo.png" alt="logo" />
            </div>
            <h2 className="title">ثبت نام</h2>
            <p className="subtitle">
              اگر قبلا با ایمیل ثبت‌نام کرده‌اید، نیاز به ثبت‌نام مجدد با شماره همراه ندارید.
            </p>
          </div>

          {/* --- Alerts --- */}
          <div className="alerts">
            {apiSuccess && <div className="alert alert-success">{apiSuccess}</div>}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
          </div>

          {/* --- Form --- */}
          <div className="form-wrapper">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  {/* نام کاربری */}
                  <div className="form-group">
                    <label className="label" htmlFor="username">نام کاربری</label>
                    <div className="input-box">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="input-ui"
                        placeholder="نام کاربری خود را وارد نمایید"
                      />
                      <i className="mdi mdi-account-circle-outline"></i>
                    </div>
                    <ErrorMessage name="username" component="div" className="error-msg" />
                  </div>

                  {/* ایمیل */}
                  <div className="form-group">
                    <label className="label" htmlFor="email">ایمیل</label>
                    <div className="input-box">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="input-ui"
                        placeholder="ایمیل خود را وارد نمایید"
                      />
                      <i className="mdi mdi-email-outline"></i>
                    </div>
                    <ErrorMessage name="email" component="div" className="error-msg" />
                  </div>

                  {/* شماره موبایل */}
                  <div className="form-group">
                    <label className="label" htmlFor="phone">شماره موبایل</label>
                    <div className="input-box">
                      <Field
                        type="text"
                        name="phone"
                        id="phone"
                        className="input-ui"
                        placeholder="شماره موبایل خود را وارد نمایید"
                      />
                      <i className="mdi mdi-phone-outline"></i>
                    </div>
                    <ErrorMessage name="phone" component="div" className="error-msg" />
                  </div>

                  {/* رمز عبور */}
                  <div className="form-group">
                    <label className="label" htmlFor="password">رمز عبور</label>
                    <div className="input-box">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="input-ui"
                        placeholder="رمز عبور خود را وارد نمایید"
                      />
                      <i className="mdi mdi-lock-open-variant-outline"></i>
                    </div>
                    <ErrorMessage name="password" component="div" className="error-msg" />
                  </div>

                  {/* قوانین */}
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name="laws"
                      id="laws"
                      className="law-check-input"
                    />
                    <label className="custom-control-label" htmlFor="laws">
                      <a href="#">حریم خصوصی</a> و <a href="#">شرایط و قوانین</a> را خوانده‌ام و می‌پذیرم.
                    </label>
                    <ErrorMessage name="laws" component="div" className="error-msg" />
                  </div>

                  {/* دکمه ارسال */}
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? "در حال ثبت..." : "ثبت نام"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* --- Footer --- */}
          <div className="footer">
            قبلا ثبت نام کرده‌اید؟
            <Link to="/login" className="ml-2 mr-2">ورود</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
