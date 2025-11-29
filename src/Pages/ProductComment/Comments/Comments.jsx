import React, { useState } from "react";
import api from "../../../api/axios";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplyCommentPortal from "../../../Components/ReplyCommentPortal/ReplyCommentPortal";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import ShowSwal from "../../../Components/ShowSwal/ShowSwal";
import useAllComments from "../../../Hooks/useAllComments";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import moment from "jalali-moment";

const Comments = ({ product }) => {
  const { comments } = useAllComments();
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showName, setShowName] = useState(currentUser?.username || "");

  const productComments = comments.filter(
    (c) => !c.is_reply && c.status === "approved" && c.productID === product.id
  );

  const getReplies = (id) =>
    comments.filter(
      (c) => c.is_reply && c.reply_id === id && c.status === "approved"
    );

  const onReply = (id) => {
    setCommentId(id);
    setOpen(true);
  };

  const onClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!replyText.trim()) return alert("لطفاً متن پیام را وارد کنید!");

    try {
      const res = await api.post("/comments", {
        body: replyText,
        userID: 1,
        productID: product.id,
        is_reply: 1,
        reply_id: commentId,
      });
      if (res.status === 200 || res.status === 201) {
        ShowSwal({
          title: "پاسخ شما ثبت شد پس از بررسی نمایش داده میشود",
          icon: "success",
          showConfirmButton: true,
          onConfirm: onClose,
        });
      }
    } catch (err) {
      alert(err.response?.data?.error || "مشکل در اتصال به سرور");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {productComments.length === 0 ? (
        <ErrorMessage msg="هنوز نظری برای این محصول ثبت نشده است" />
      ) : (
        productComments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <img
                  src="/img/profile-pic/1.png"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{comment.userName}</span>
                    <span className="text-gray-500 text-sm">
                      | {comment.userRole === "admin" ? "ادمین" : "کاربر"}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {moment(comment.created_at).locale("fa").format("YYYY/MM/DD")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onReply(comment.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <ReplyOutlinedIcon />
              </button>
            </div>
            <p className="mt-2 text-gray-700">{comment.body}</p>

            <div className="ml-16 mt-4 space-y-3">
              {getReplies(comment.id).map((reply) => (
                <div key={reply.id} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{reply.userName}</span>
                    <span className="text-gray-500 text-sm">
                      | {reply.userRole === "admin" ? "ادمین" : "کاربر"}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {moment(reply.created_at).locale("fa").format("YYYY/MM/DD")}
                    </span>
                  </div>
                  <p className="text-gray-700">{reply.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <ReplyCommentPortal open={open}>
        <div className="space-y-4 p-4">
          <div className="flex items-center space-x-2">
            <ArrowForwardIcon onClick={onClose} className="cursor-pointer" />
            <h3 className="text-lg font-bold">ثبت پاسخ</h3>
          </div>

          <div className="flex space-x-4 items-center">
            <img
              src={`/img/products/${product.img}`}
              alt="Product"
              className="w-20 h-20 rounded-lg"
            />
            <p className="text-gray-700">{product.productDesc}</p>
          </div>

          <textarea
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            <span>ارسال با نام:</span>
            <select
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
              className="border rounded-lg p-1"
            >
              <option value={currentUser?.username}>{currentUser?.username}</option>
              <option value="کاربر سایت">ارسال ناشناس</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ثبت
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              بستن
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            ثبت دیدگاه به معنی موافقت با{" "}
            <a href="#" className="text-blue-600 hover:underline">
              قوانین انتشار دیجی‌کالا
            </a>{" "}
            است.
          </p>
        </div>
      </ReplyCommentPortal>
    </div>
  );
};

export default Comments;
