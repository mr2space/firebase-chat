import React, { useContext } from 'react'
import Profile from "../assessts/img/iheb-ab-OBufvGMaBaQ-unsplash.jpg"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const handleLogout = ()=>{
    signOut(auth)
  }
  return (
    <div className="flex justify-between p-5  items-center border-b border-white">
      <span className="text-lg font-semibold text-white">Fire Chat</span>
      <div className="flex gap-3 items-center">
        <img src={currentUser.photoURL} alt="profile" className='object-cover w-8 h-8 rounded-full' />
        <button className='bg-blue-500 rounded-sm p-1 text-xs text-white font-semibold' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar