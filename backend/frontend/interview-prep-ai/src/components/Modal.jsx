import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-md">
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-orange-100"
        >
          <LuX size={18} />
        </button>

        {/* <div className="flex-1 overflow-y-auto p-4">{children}</div> */}
        <div className=" p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
