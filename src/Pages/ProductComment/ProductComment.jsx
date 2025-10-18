import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
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
        const response = await api.get("/api/comments");
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
      const response = await api.post("/api/comments", newComment);

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
    <main className="product-comment_section">
      <div className="product-comment-section_container">
        <div className="product-comment-content">
          <div className="product-row">
            {/* تصویر محصول */}
            <div className="product-thumbnail">
              <a href="#">
                <img
                  src={`/img/products/${product.img}`}
                  alt={product.title}
                />
              </a>
            </div>

            {/* اطلاعات محصول */}
            <div className="product-info">
              <div className="product-title">
                <h1>{product.title}</h1>
              </div>
            </div>
          </div>

          {/* بخش افزودن نظر */}
          <div className="comment-section">
            <div className="comment-form">
              {error && <div className="form-error">{error}</div>}
              <form onSubmit={(e) => handleSubmit(e, product.id)}>
                <div className="form-group">
                  <label>عنوان نظر شما (اجباری)</label>
                  <input
                    type="text"
                    placeholder="عنوان نظر خود را بنویسید"
                    value={commentTitle}
                    onChange={(e) => setCommentTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>متن نظر شما (اجباری)</label>
                  <textarea
                    rows="5"
                    placeholder="متن خود را بنویسید"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <h2>آیا خرید این محصول را به دوستانتان پیشنهاد می‌کنید؟</h2>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="recommend"
                        checked={recommend === true}
                        onChange={() => setRecommend(true)}
                      />
                      پیشنهاد می‌کنم
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="recommend"
                        checked={recommend === false}
                        onChange={() => setRecommend(false)}
                      />
                      خیر، پیشنهاد نمی‌کنم
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <p>
                    با “ثبت نظر” موافقت خود را با{" "}
                    <a href="#" target="_blank">
                      قوانین انتشار محتوا
                    </a>{" "}
                    اعلام می‌کنم.
                  </p>
                  <button type="submit" className="btn-primary">
                    {replyTo ? "ارسال پاسخ" : "ثبت نظر"}
                  </button>
                  {replyTo && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setReplyTo(null)}
                    >
                      لغو پاسخ
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* قوانین ثبت نظر */}
            <div className="comment-rules">
              <h3>
                دیگران را با نوشتن نظرات خود، برای انتخاب این محصول راهنمایی کنید.
              </h3>
              <div className="desc-comment">
                <p>لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:</p>
                <ol>
                  <li>احترام به دیگران...</li>
                  <li>مرتبط بودن...</li>
                  <li>ممنوعیت تبلیغات...</li>
                  <li>صداقت...</li>
                  <li>رعایت حریم خصوصی...</li>
                  <li>زبان مناسب...</li>
                </ol>
              </div>
            </div>
          </div>

          {/* لیست نظرات */}
          <div className="comments-list">
            <div className="comments-header">
              <QuestionAnswerRoundedIcon className="comments-icon" />
              <div className="comments-title">نظرات</div>
            </div>
            <div className="comments-body">
              <Comments onReply={handleReply} product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}