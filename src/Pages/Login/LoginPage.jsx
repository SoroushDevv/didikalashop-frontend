import React from "react";
import "./LoginPage.css";
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
    <div className="wrapper">
      <main className="main-content dt-sl mt-4 mb-3">
        <div className="container main-container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-7 col-12 mx-auto">
              <div className="logo-area text-center mb-3">
                <Link to="#">
                  <img src="./img/logo.png" className="img-fluid" alt="logo" />
                </Link>
              </div>

              <div className="auth-wrapper form-ui border pt-4">
                <div className="section-title title-wide mb-1 no-after-title-wide">
                  <h2 className="font-weight-bold">ورود</h2>
                </div>

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
                      console.error(err);
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
                    <Form>
                      <div className="form-row-title">
                        <h3>نام کاربری</h3>
                      </div>
                      <div className="form-row with-icon">
                        <Field
                          type="text"
                          name="username"
                          className="input-ui pr-2"
                          placeholder="نام کاربری خود را وارد نمایید"
                        />
                        <i className="mdi mdi-account-circle-outline"></i>
                        <ErrorMessage name="username" component="div" className="text-danger" />
                      </div>

                      <div className="form-row-title">
                        <h3>رمز عبور</h3>
                      </div>
                      <div className="form-row with-icon">
                        <Field
                          type="password"
                          name="password"
                          className="input-ui pr-2"
                          placeholder="رمز عبور خود را وارد نمایید"
                        />
                        <i className="mdi mdi-lock-open-variant-outline"></i>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>

                      <div className="form-row mt-2">
                        <div className="custom-control custom-checkbox float-right mt-2">
                          <Field
                            type="checkbox"
                            name="rememberMe"
                            className="custom-control-input"
                            id="customCheck3"
                          />
                          <label className="custom-control-label" htmlFor="customCheck3" style={{margin:"0 10px"}}>
                            مرا به خاطر بسپار
                          </label>
                        </div>
                      </div>

                      <div className="form-row mt-3">
                        <button
                          type="submit"
                          className="btn-primary-cm btn-with-icon mx-auto w-100"
                          disabled={isSubmitting}
                        >
                          <i className="mdi mdi-login-variant"></i>
                          {isSubmitting ? "در حال ورود..." : "ورود به دیدیکالا"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

                <div className="form-footer mt-3">
                  <div>
                    <span className="font-weight-bold">کاربر جدید هستید؟</span>
                    <Link to="/register" className="mr-3 mt-2" style={{margin:"0 10px"}}>
                      ثبت نام در دیدیکالا
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mini-footer dt-sl">
        <div className="container main-container">
          <div className="row">
            <div className="col-12">
              <ul className="mini-footer-menu">
                <li>
                  <a href="#">درباره دیدیکالا</a>
                </li>
                <li>
                  <a href="#">فرصت های شغلی</a>
                </li>
                <li>
                  <a href="#">تماس با ما</a>
                </li>
                <li>
                  <a href="#">همکاری با سازمان ها</a>
                </li>
              </ul>
            </div>
            <div className="col-12 mt-2 mb-3">
              <div className="footer-light-text">
                استفاده از مطالب فروشگاه اینترنتی دیدیکالا فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به (فروشگاه آنلاین دیدیکالا) می‌باشد.
              </div>
            </div>
            <div className="col-12 text-center">
              <div className="copy-right-mini-footer">
                Copyright © 2019 Didikala
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
