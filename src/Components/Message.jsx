import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(
    ()=>{
      ref.current?.scrollIntoView({behavior:"smooth"})
    }, [message]
  )

  return (
    <div ref={ref} className={message.senderId === currentUser.uid?"message flex gap-5 mb-5 owner": "message flex gap-5 mb-5"}>
      <div className="messageInfo flex flex-col text-gray-500 font-normal gap-1 items-start justify-start">
        <img
          src={message.senderId === currentUser.uid? currentUser.photoURL: data.user.photoURL}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover shadow-md mb-2"
        />
        <span className="text-xs">Just Now</span>
      </div>
      <div className={message.senderId === currentUser.uid?"messageContent  flex flex-col gap-3 w-4/5 items-end":"messageContent flex flex-col gap-3 w-4/5"}>
        <p className="bg-[rgba(255,255,255,0.10);] text-white px-4 py-2 w-max rounded-e-xl rounded-b-xl max-w-4/5 shadow-md">
          {message.text}
        </p>
        {message.img && <img
          src={message.img}
          alt="received"
          className="w-1/2 object-cover"
        />}
      </div>
    </div>
  );
};

export default Message;
