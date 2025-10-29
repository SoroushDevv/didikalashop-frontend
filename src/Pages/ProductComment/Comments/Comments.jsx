import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./Comments.css";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import useAllComments from "../../../Hooks/useAllComments";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ReplyCommentPortal from "../../../Components/ReplyCommentPortal/ReplyCommentPortal";
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Modal } from "@mui/material";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShowSwal from "../../../Components/ShowSwal/ShowSwal";

const Comments = ({ product }) => {
  const { comments, loading, error } = useAllComments()
  const [open, setOpen] = useState(null)
  const [commentId, setCommentId] = useState(null)
  const moment = require('jalali-moment');
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();
  const [replyText, setReplyText] = useState(null)
  const [showName, setShowName] = useState(null)


  console.log(currentUser)
  const productComments = comments.filter((comment) =>
    !comment.is_reply &&
    comment.status === "approved" &&
    comment.productID === product.id
  )

  console.log("product comments:", productComments)

  const getReplies = (commentId) => {
    console.log(productComments)
    console.log(commentId)
    const reply = comments.filter(
      (comment) =>
        comment.is_reply &&
        comment.reply_id === commentId &&
        comment.status === "approved"
    );
    return reply;
  };


  const onReply = (commentId) => {
    console.log(commentId)
    setCommentId(commentId)
    setOpen(true)

  }

  const onClose = () => {
    setOpen(false)
  }



const handleSubmit = async () => {
  console.log(commentId)
  if (replyText.trim()) {
    try {
      const res = await api.post("/api/comments", {
        body: replyText,             
        userID: 1,                 
        productID: product.id,     
        is_reply: 1,               
        reply_id: commentId 
      });

      if(res.status === 200 || res.status === 201) {
        ShowSwal({title:"پاسخ شما ثبت شد پس از بررسی نمایش داده میشود",text:"",icon:"success",showConfirmButton : true,onConfirm:() => onClose()})
       console.log("ریپلای ثبت شد:", res.data); 
      }
    
    } catch (err) {
      if (err.response) {
        alert("خطا: " + err.response.data.error);
      } else {
        alert("مشکل در اتصال به سرور");
      }
      console.error(err);
    }
  } else {
    alert("لطفاً متن پیام را وارد کنید!");
  }
};




  return (
    <div className="comments-container">
      {productComments.length === 0 ? (
        <ErrorMessage msg="هنوز نظری برای این محصول ثبت نشده است" />
      ) : (
        productComments.map((comment) => (
          <div key={comment.id} className="comment-container">
            <div className="comment-header">
              <div className="user-info">
                <div className="user-avatar-container hidden sm:block">
                  <div className="avatar-badge">
                    <svg className="icon">
                      <use href="#academic-cap-mini" />
                    </svg>
                  </div>
                  <img
                    src={"/img/profile-pic/1.png"}
                    className="user-avatar"
                    alt="User Avatar"
                  />
                </div>
                <div className="user-details">
                  <div className="user-name-container">
                    <span className="user-name">{comment.userName}</span>
                    <strong className="user-role">| {comment.userRole === "admin" ? "ادمین" : "کاربر"}</strong>
                  </div>
                  <span className="comment-date">
                    {moment(comment.created_at).locale('fa').format('YYYY/MM/DD')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                data-pid={comment.id}
                data-author={comment.userName}
                className="reply-btn"
                onClick={() => onReply(comment.id)}
              >
                <ReplyOutlinedIcon className="reply-icon" color="primary" />
              </button>
            </div>
            <p className="comment-text">{comment.body}</p>
            <div className="replies-container">
              {getReplies(comment.id).map((reply) => (
                <div key={reply.id} className="reply-container">
                  <div className="reply-header">
                    <div className="user-info">
                      <div className="user-avatar-container hidden sm:block">
                        <div className="avatar-badge reply-badge">
                          <svg className="icon">
                            <use href="#check-mini" />
                          </svg>
                        </div>
                        <img
                          src="/img/profile-pic/1.png"
                          className="user-avatar"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="user-details">
                        <div className="user-name-container">
                          <span className="user-name">{reply.userName}</span>
                          <strong className="user-role">| {reply.userRole === "admin" ? "ادمین" : "کاربر"}</strong>
                        </div>
                        <span className="comment-date">
                          {moment(reply.created_at).locale('fa').format('YYYY/MM/DD')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="comment-text">{reply.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <ReplyCommentPortal open={open}>

        <div class="modal-header">
          <div class="reply-title_container">
            <ArrowForwardIcon className="reply-title_icon" onClick={onClose} />
            <span class="reply-title">ثبت پاسخ</span>
          </div>
        </div>

        <div class="product-info">
          <img src={`/img/products/${product.img}`} alt="product" class="product-img" />
          <p class="product-desc">{product.productDesc}</p>
        </div>

        <div class="comment-field">
          <label for="comment" class="comment-label">متن پاسخ</label>
          <textarea
            id="comment"
            class="comment-input"
            placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید..."
            onChange={(e) => {
              setReplyText(e.target.value)
            }}
          ></textarea>
        </div>
        <div class="user-select-container">
          <span class="user-name">{showName}</span>
          <select class="user-select" onChange={(e) => {
            setShowName(e.target.value)
          }}>
            <option value={`${currentUser ? currentUser.username : " "}`} selected>ارسال با نام شما</option>
            <option value="کاربر سایت">ارسال ناشناس</option>
          </select>
        </div>

        <div class="comment-buttons">
          <button class="btn-submit" onClick={() => handleSubmit()}>ثبت </button>
          <button class="close-modal-btn" onClick={onClose}>بستن</button>
        </div>

        <div class="comment-footer">
          ثبت دیدگاه به معنی موافقت با
          <a href="#" class="comment-link">قوانین انتشار دیجی‌کالا</a>
          است.
        </div>

      </ReplyCommentPortal>

    </div>
  );
};

export default Comments;