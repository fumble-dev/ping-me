import { Avatar } from "@/components/ui/avatar";
import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {

  const { closeChat, selectedChatData, selectedChatType } = useAppStore()

  return (
    <div className="h-[10vh] border-b border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex items-center gap-5 w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className='w-12 h-12 relative'>
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData?.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(
                    selectedChatData?.color
                  )}`}
                >
                  {selectedChatData?.firstName
                    ? selectedChatData.firstName.charAt(0)
                    : selectedChatData?.email?.charAt(0)}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {
              selectedChatType === "contact" && selectedChatData.firstName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : `${selectedChatData.email}`
            }
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button onClick={closeChat} className="text-neutral-500 hover:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
