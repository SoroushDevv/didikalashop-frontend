import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./ReplyCommentPortal.css"
function ReplyCommentPortal({ children, open }) {

  if (!open) return null;


  return ReactDOM.createPortal(
    <div
      className='modal-wrapper'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className='modal-wrapper'
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          textAlign: 'right',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}

      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default ReplyCommentPortal;