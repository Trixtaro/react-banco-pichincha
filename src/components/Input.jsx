import React, { useEffect, useState } from "react";

const Input = ({
  type = "text",
  id = undefined,
  name = "",
  className = "",
  onChange = () => {},
  value = "",
  placeHolder = "",
  styles = {},
  pattern = undefined,
  validationMessage = "",
  required = false,
  disabled = false,
  accept = undefined,
  forceValid = undefined,
}) => {
  const [isValid, setValid] = useState(true);

  const handleChange = (e) => {
    const valid = e.target.validity.valid;
    setValid(valid);
    if (onChange) onChange(e, valid);
  };

  return (
    <>
      <input
        accept={accept}
        type={type}
        id={id}
        name={name}
        className={className}
        onChange={handleChange}
        value={value}
        placeholder={placeHolder}
        style={{
          height: "25px",
          minWidth: "150px",
          border: "2px solid #ddd",
          borderRadius: "5px",
          ...styles,
        }}
        pattern={pattern}
        onInvalid={(e) => {
          e.preventDefault();
        }}
        required={required}
        disabled={disabled}
      />
      {(pattern || forceValid !== undefined) && (
        <div style={{ height: "20px", marginTop: "10px" }}>
          {(isValid === false || forceValid === false) && (
            <div style={{ color: "red", fontSize: "10px" }}>
              {validationMessage}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
