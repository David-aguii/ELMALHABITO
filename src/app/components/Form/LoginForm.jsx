'use client'
import React from 'react'
import "./loginsign.css"
import Link from 'next/link'
import {login} from "../../api/route"
 
const LoginForm = () => {
 

  const handleSubmit= async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    }
    
    try {
      const result = await login(data);
      console.log(result);
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <section >
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input name="email" required/>
                <label >Email</label>
            </div>
            <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name="password" required/>
                <label >Password</label>
            </div>
            <div className="forget">
                <label ><input type="checkbox"/>Remember Me</label>
                <a href="#">Forget Password</a>
            </div>
            <button>Log in</button>
            <div className="register">
                <p>Don't have a account? <Link href="/register" >Register.</Link></p>
            </div>
            </form>
        </section>
    </div>
  )
}

export default LoginForm;
