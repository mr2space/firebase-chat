import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'


const Messages = () => {
  const [messages, setMessages] = useState(new Array())
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() &&  setMessages(doc.data().messages)
    })
    return ()=>{
      unsub()
    }
  }, [data.chatId])
  console.log(messages)
  return (
    <div className="messages  p-4 h-[calc(100%-120px)] overflow-y-scroll">
        {messages.map((msg)=>{
          return (
          <Message message={msg} key={msg.id} />
        )})}
    </div>
  )
}

export default Messages