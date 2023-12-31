import React, { useState } from 'react'
import Add from '../assessts/img/pngwing.com.png'
import { auth, storage, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';



const Register = () => {
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef  = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) =>{
          const progess = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
          console.log("upload is " + progess)
        },
        (error) => {
          setErr(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
            await updateProfile(res.user, {
              displayName:displayName,
              photoURL:downloadURL
            })

            await setDoc(doc(db, "users", res.user.uid),{
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL
            })

            await setDoc(doc(db, "userChats", res.user.uid),{})
            navigate("/")
          })
        }
      )

      
    }catch(err){
      setErr(err)
    }
  }

  return (
    <div className="register-back">
        <div className="form-box">
            <span className="logo text-blue-600">Lama Chat</span>
            <span className="form-title">Register</span>
            <form className='form' onSubmit={handleSubmit}>
                <input type="text" placeholder='display name' className='form-input'/>
                <input type="email" placeholder='Email' className='form-input'/>
                <input type="password" placeholder='password' className='form-input' />
                <input type="file" name="" id="upload-photo" className='hidden' />
                <label htmlFor="upload-photo" className='flex items-center w-3/4 h-7 my-3 cursor-pointer'>
                    <img src={Add} alt="upload" className='object-cover w-9' />
                    <span className='text-sm ml-2'>Upload Your Photo</span>
                </label>
                {err && <span>Something went wrong !!</span>}
                <button className='sign-button'>Sign up</button>
            </form>
            <p className='text-sm p-2 font-semibold' >You do have account? <Link to="/login">Login</Link>  </p>
        </div>
    </div>
  )
}

export default Register