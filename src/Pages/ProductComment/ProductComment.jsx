import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";
import "./ProductComment.css"; // فرض بر وجود فایل CSS برای استایل‌دهی
import ErrorMessage from "./../ErrorMessage/ErrorMessage"
import { useCurrentUser } from "./../../Hooks/useCurrentUser"
import ShowSwal from "./../../Components/ShowSwal/ShowSwal"
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

export default function ProductComment({ product }) {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [replyTo, setReplyTo] = useState(null); // برای پاسخ به کامنت خاص
  const [error, setError] = useState(null);
  const { currentUser, loading, error: userError } = useCurrentUser()
  // دریافت کامنت‌ها از API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/comments");
        // فیلتر کردن کامنت‌های مربوط به محصول فعلی و تأییدشده
        console.log(response.data)
        const productComments = response.data.filter(
          (comment) =>
            comment.productID === product.id && comment.status === 1
        );
        console.log(productComments)
        setComments(productComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("خطا در دریافت نظرات");
      }
    };
    fetchComments();
  }, [product.title]);

  // مدیریت ارسال فرم
  const handleSubmit = async (e, productID) => {

    console.log("product id:", productID)
    console.log("user id:", currentUser.id)
    

    e.preventDefault();
    if (!commentTitle.trim() || !commentBody.trim()) {
      setError("عنوان و متن نظر الزامی است");
      return;
    }
    if (recommend === null) {
      setError("لطفاً گزینه پیشنهاد یا عدم پیشنهاد را انتخاب کنید");
      return;
    }

    try {

      const newComment = {
        body: commentBody.trim(),
        userID: Number(currentUser.id),
        productID: Number(productID),
        is_reply: replyTo ? 1 : 0,
        reply_id: replyTo ? Number(replyTo) : null
      };

      console.log(newComment)
      const response = await axios.post("http://localhost:8000/api/comments", newComment);

      console.log(response.status)
      if (response.status === 200 || response.status === 201) {

        ShowSwal({
          title: "کامنت ثبت شد پس از تایید قابل نمایش میشود", text: "", icon: "success", showConfirmButton: true, onConfirm: () => {
            setComments([
              ...comments,
              {
                ...newComment,
                id: response.data.commentID,
                date: new Date().toISOString().split("T")[0],
                hour: new Date().toTimeString().split(" ")[0],
                status: 0
              }
            ]);
            setCommentBody("");
            setCommentTitle("");
            setReplyTo(null);
            setError(null);
            console.log("comments:", comments)
          }
        })

      }


    } catch (err) {
      console.error("Error adding comment:", err);
      setError("خطا در ثبت نظر");
    }
  };

  // مدیریت کلیک روی دکمه پاسخ
  const handleReply = (commentId) => {
    console.log(commentId)
    setReplyTo(commentId);
  };

  console.log(comments)
  return (
    <main className="main-content dt-sl mb-3">
      <div className="container main-container">
        <div className="dt-sn mb-5 dt-sl">
          <div className="row">
            <div className="col-lg-4 col-md-6 pb-5">
              <div className="product-thumbnail text-center">
                <a href="#">
                  <img
                    src={`/img/products/${product.img}`}
                    className="img-fluid"
                    alt={product.title}
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 pb-5">
              <div className="product-info dt-sl">
                <div className="product-title dt-sl">
                  <h1>{product.title}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row comments-add-col--content">
            <div className="col-md-6 col-sm-12">
              <div className="form-ui">
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="px-5" onSubmit={(e) => handleSubmit(e, product.id)}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-row-title mb-2">
                        عنوان نظر شما (اجباری)
                      </div>
                      <div className="form-row">
                        <input
                          className="input-ui pr-2"
                          type="text"
                          placeholder="عنوان نظر خود را بنویسید"
                          value={commentTitle}
                          onChange={(e) => setCommentTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <div className="form-row-title mb-2">
                        متن نظر شما (اجباری)
                      </div>
                      <div className="form-row">
                        <textarea
                          className="input-ui pr-2 pt-2"
                          rows="5"
                          placeholder="متن خود را بنویسید"
                          value={commentBody}
                          onChange={(e) => setCommentBody(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 mt-2 mb-2 px-0">
                      <div className="product-offer-question">
                        <div className="section-title text-sm-title title-wide mb-1 no-after-title-wide">
                          <h2 className="font-weight-bold">
                            آیا خرید این محصول را به دوستانتان پیشنهاد می‌کنید؟
                          </h2>
                        </div>
                        <div className="product-offer-question-option">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="customRadio1"
                              name="customRadio"
                              className="custom-control-input"
                              checked={recommend === true}
                              onChange={() => setRecommend(true)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio1"
                            >
                              پیشنهاد می‌کنم
                            </label>
                          </div>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="customRadio2"
                              name="customRadio"
                              className="custom-control-input"
                              checked={recommend === false}
                              onChange={() => setRecommend(false)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio2"
                            >
                              خیر، پیشنهاد نمی‌کنم
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 px-0">
                      <p className="d-block">
                        با “ثبت نظر” موافقت خود را با{" "}
                        <a href="#" className="border-bottom-dt" target="_blank">
                          قوانین انتشار محتوا
                        </a>{" "}
                        در دیجی‌کالا اعلام می‌کنم.
                      </p>
                      <button type="submit" className="btn btn-primary py-1 px-4 " >
                        {replyTo ? "ارسال پاسخ" : "ثبت نظر"}
                      </button>
                      {replyTo && (
                        <button
                          type="button"
                          className="btn btn-secondary px-3 ml-2"
                          onClick={() => setReplyTo(null)}
                        >
                          لغو پاسخ
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <h3>
                دیگران را با نوشتن نظرات خود، برای انتخاب این محصول راهنمایی
                کنید.
              </h3>
              <div className="desc-comment">
                <p>لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:</p>
                <ol>
                  <li>احترام به دیگران: از به‌کار بردن الفاظ توهین‌آمیز، ناپسند یا تحقیرآمیز خودداری کنید.</li>
                  <li>مرتبط بودن: نظرات باید مرتبط با محصول یا خدمات ارائه‌شده باشد.</li>
                  <li>ممنوعیت تبلیغات: درج لینک یا تبلیغ محصولات و خدمات دیگر ممنوع است.</li>
                  <li>صداقت: نظرات باید بر اساس تجربه واقعی و صادقانه نوشته شوند.</li>
                  <li>رعایت حریم خصوصی: از انتشار اطلاعات شخصی خود یا دیگران در نظرات خودداری کنید.</li>
                  <li>زبان مناسب: نظرات باید به زبان فارسی و با رعایت اصول نگارشی نوشته شوند.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="row comments-list">
            <div className="col-24">
              <div className="comments-list-title comments-title-container">
                <QuestionAnswerRoundedIcon style={{color:"red"}}/>
                <div className="comments-title"> نظرات</div>
              </div>
              <div className="comments-list-content">
                <Comments onReply={handleReply} product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}