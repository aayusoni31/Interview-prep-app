import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div className="mb-4">
    //   <label className="block text-[13px] font-medium text-gray-900 mb-1">
    //     {label}
    //   </label>

    //   <div className="input-box border-2 border-gray-500 hover:bg-gray-400 text-black bg-gray-300/50">
    //     <input
    //       type={
    //         type === "password" ? (showPassword ? "text" : "password") : type
    //       }
    //       value={value}
    //       onChange={onChange}
    //       placeholder={placeholder}
    //       className="w-full bg-transparent outline-none"
    //     />

    //     {type === "password" && (
    //       <>
    //         {showPassword ? (
    //           <FaRegEye
    //             className="cursor-pointer text-amber-400"
    //             size={22}
    //             onClick={() => toggleShowPassword()}
    //             // onClick={() => setShowPassword(false)}
    //           />
    //         ) : (
    //           <FaRegEyeSlash
    //             className="cursor-pointer text-slate-400"
    //             size={22}
    //             onClick={() => toggleShowPassword()}
    //             // onClick={() => setShowPassword(true)}
    //           />
    //         )}
    //       </>
    //     )}
    //   </div>
    // </div>

    <div className="mb-4">
      <label className="block text-[13px] font-medium text-gray-900 mb-1">
        {label}
      </label>

      <div className="flex items-center gap-2 border-2 border-gray-500 bg-gray-300/50 px-3 py-2 rounded-md">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              className="cursor-pointer text-amber-400"
              size={20}
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              className="cursor-pointer text-slate-400"
              size={20}
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
