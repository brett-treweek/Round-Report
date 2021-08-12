import React from "react";
import './Form.css'

const Input = ({
  type,
  label,
  placeholder,
  handleChange,
  autoFocus,
}) => {
  return (
    <div className="loginWrapper">
      <label htmlFor={label} className="loginLabel">{placeholder}</label>
      <input
        className="loginInput"
        placeholder={placeholder}
        name={label}
        type={type}
        id={label}
        onChange={handleChange}
        autoFocus={autoFocus}
        autoComplete={type}
      />
    </div>
  );
};

export default Input;
