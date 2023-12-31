import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'

const Home = () => {
  return (
    <div className="home">
        <div className="w-4/5 h-5/6 flex overflow-hidden rounded-lg bg-black/75">
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}

export default Home