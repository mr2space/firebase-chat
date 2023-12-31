import React, { useContext } from 'react'
import Add from '../assessts/img/add.png'
import Cam from '../assessts/img/cam.png'
import More from '../assessts/img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'



const Chat = () => {
  const {data} = useContext(ChatContext)


  return (
    <div className='basis-2/3 '>
      <div className="flex justify-between p-5 text-white items-center border-b border-white">
        <span className='text-lg '>{data?.user.displayName}</span>
        <div className="flex gap-4">
          <div className="img-cover">
          <img src={Cam} alt="add" className='chat-icons' />
          </div>

          <div className="img-cover">
          <img src={Add} alt="add" className='chat-icons' />
          </div>
          <div className="img-cover">
          <img src={More} alt="add" className='chat-icons' />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat