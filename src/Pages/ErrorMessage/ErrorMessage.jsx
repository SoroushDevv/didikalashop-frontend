import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({ msg }) {
  return (
    <p className="error-message">
      {msg}
    </p>
  );
}