import React from "react";

const ButtonPrimary = ({disabled=false, onChange, title}) => {
    return (
        <button 
            onClick={onChange} 
            className={`w-full mt-7 shadow-2xl ${!disabled ? "bg-[linear-gradient(108.32deg,_rgba(98,205,203,1)_24.88%,_rgba(69,153,219,1)_78.49%)]" : "bg-[linear-gradient(108.32deg,_rgba(98,205,203,0.5)_24.88%,_rgba(69,153,219,0.5)_78.49%)]"} py-3 font-bold text-center rounded-md`} 
            disabled={disabled}>
            {title}
        </button>
    )

}

export default ButtonPrimary;