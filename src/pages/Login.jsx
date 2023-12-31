import React  from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const Login = () => {

  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
      
    }catch(err){
      setErr(err)
    }
  }


  return (
    <div className="register-back">
        <div className="form-box">
            <span className="logo text-blue-600">Lama Chat</span>
            <span className="form-title">Login</span>
            <form onSubmit={handleSubmit} className='form'>
                <input type="email" placeholder='Email' className='form-input'/>
                <input type="password" placeholder='password' className='form-input' />
                {err && <span>Something went wrong !!</span>}
                <button className='sign-button'>Sign in</button>
            </form>
            <p className='text-sm p-2 font-semibold' >You don't have account? <Link to="/register">Register</Link>  </p>
        </div>
    </div>
  )
}

export default Login