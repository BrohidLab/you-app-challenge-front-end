import React from "react";

function TextInput({ placeholder = "", value = "", onChange, className, type = "text", id, readonly=false, name }) {
    return (
        <input
            className={`${className} ${readonly ? "text-gray-500" : "text-white"}`}
            placeholder={placeholder}
            value={value}
            id={id}
            name={name}
            type={type}
            readOnly={readonly}
            onChange={(e) => onChange?.(id, e.target.value)}
            />
    );
}

export default TextInput;
