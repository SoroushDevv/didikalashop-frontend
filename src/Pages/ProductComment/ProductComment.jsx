import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import Comments from "./Comments/Comments";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import { QuestionAnswerRounded } from "@mui/icons-material";

export default function ProductComment({ product }) {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get("/comments");
        const productComments = response.data.filter(
          (comment) =>
            comment.productID === product.id && comment.status === 1
        );
        setComments(productComments);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت نظرات");
      }
    };
    fetchComments();
  }, [product.id]);

  const handleSubmit = async (e) => {
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
        productID: Number(product.id),
        is_reply: replyTo ? 1 : 0,
        reply_id: replyTo ? Number(replyTo) : null,
      };

      const response = await api.post("/comments", newComment);

      if (response.status === 200 || response.status === 201) {
        ShowSwal({
          title: "کامنت ثبت شد، پس از تایید نمایش داده می‌شود",
          icon: "success",
          showConfirmButton: true,
          onConfirm: () => {
            setComments([
              ...comments,
              {
                ...newComment,
                id: response.data.commentID,
                date: new Date().toISOString().split("T")[0],
                hour: new Date().toTimeString().split(" ")[0],
                status: 0,
              },
            ]);
            setCommentBody("");
            setCommentTitle("");
            setReplyTo(null);
            setError(null);
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError("خطا در ثبت نظر");
    }
  };

  const handleReply = (commentId) => setReplyTo(commentId);

  return (
    <main className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white p-6 rounded-lg shadow">
          <div className="w-full md:w-fit">
            <img
              src={`/img/products/${product.img}`}
              alt={product.title}
              className="w-24 h-auto rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          {error && (
            <div className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="inline-block font-medium mb-1 relative pl-4 pt-2">عنوان نظر شما  
                <span className="absolute top-0 left-0 text-red-600 font-bold text-3xl " >*</span>
              </label>
              <input
                type="text"
                placeholder="عنوان نظر خود را بنویسید"
                value={commentTitle}
                onChange={(e) => setCommentTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
               <label className="inline-block font-medium mb-1 relative pl-4 pt-2">متن نظر شما
                <span className="absolute top-0 left-0 text-red-600 font-bold text-3xl " >*</span>
              </label>
              <textarea
                rows="5"
                placeholder="متن خود را بنویسید"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <div>
              <h2 className="font-medium mb-2">آیا خرید این محصول را به دوستانتان پیشنهاد می‌کنید؟</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="recommend"
                    checked={recommend === true}
                    onChange={() => setRecommend(true)}
                  />
                  پیشنهاد می‌کنم
                </label>
                <label className="flex items-center gap-2">
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

            <div className="flex flex-col md:flex-row gap-2 items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {replyTo ? "ارسال پاسخ" : "ثبت نظر"}
              </button>
              {replyTo && (
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  لغو پاسخ
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold">
            {currentUser && currentUser.role === "Admin" ? <QuestionAnswerRounded className="text-blue-600" />: ""}
            
            <span>نظرات</span>
          </div>
          <Comments onReply={handleReply} product={product} />
        </div>
      </div>
    </main>
  );
}
