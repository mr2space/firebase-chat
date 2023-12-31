import React from "react";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const {data} = useContext(ChatContext)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user_info) => {
    dispatch({ type: "CHANGE_USER", payload: user_info });
  };
  console.log(chats);
  return (
    <div className="chats">
      {Object?.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            data-tilt
            data-tilt-glare
            data-tilt-max-glare="0.8"
            className={data.user.uid === chat[1].userInfo.uid ?"user-chat active": "user-chat"}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
              className="user-chat-profile"
              data-tilt data-tilt-glare data-tilt-max-glare="0.8"
            />
            <div className="userchat-info">
              <span className="user-name">{chat[1].userInfo.displayName}</span>
              <p className="text-white text-sm">{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
