import React, { useContext, useState } from 'react'
import Profile from "../assessts/img/iheb-ab-OBufvGMaBaQ-unsplash.jpg"
import { collection, query, where, getDoc,getDocs, setDoc,doc, updateDoc, serverTimestamp} from 'firebase/firestore';
import {db} from "../firebase"
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username))
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          setUser(doc.data())
        })
  }catch(err) {
      setErr(err)
    }
  }

  const handleKey = e =>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async ()=>{
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
      const  res = await getDoc(doc(db, "chats", combinedId ));
      if (!res.exists()){
        await setDoc(doc(db, "chats", combinedId), {messages:[]})
        console.log("Hello")
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
        console.log("Hello")
      }
    }catch(err){
        console.log(err)
    }
    console.log("Hello")
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="search-form flex justify-center items-center p-2">
        <input type="text" placeholder='Search' value={username} onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} className='placeholder: bg-transparent text-sm w-5/6 outline-none text-white mx-auto' />
      </div>
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" className='user-chat-profile'/>
        <div className="userchat-info">
          <span className='user-name'>{user.displayName} </span>
        </div>
      </div>}
    </div>
  )
}

export default Search