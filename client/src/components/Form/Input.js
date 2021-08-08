import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({type, label, placeholder, handleChange, autoFocus, handleVisibility }) => {

  return (
    <div className={label}>
      <label htmlFor={label}>{placeholder}</label>
      <input
        placeholder={placeholder}
        name={label}
        type={type}
        id={label}
        onChange={handleChange}
        autoFocus={autoFocus}
        autoComplete={type}
        inputprops={
            label === 'password' ? {
                endAdornment: (
                    <div>
                    <FontAwesomeIcon onClick={handleVisibility} className='icon' icon={type === 'password' ? faEye : faEyeSlash}/>
                    </div>
                )
            } : null
        } 
     />
    </div>
  );
};

export default Input;
