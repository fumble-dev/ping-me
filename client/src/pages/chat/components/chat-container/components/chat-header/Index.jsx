import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b border-[#2f303b] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* Left section reserved for chat info or avatar */}
      </div>
      <button className="text-neutral-500 hover:text-white transition-all duration-300">
        <RiCloseFill className="text-3xl" />
      </button>
    </div>
  );
};

export default ChatHeader;
