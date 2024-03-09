'use client'
import React from 'react'
import "./loginsign.css"
import Link from 'next/link'
import { register } from '@/app/api/route'
 
const RegisterForm = () => {
    const handleSubmit= async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
        firstName:formData.get('firstName'),
        lastName:formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword:formData.get('confirmPassword')
        }
        console.log(data)
        try {
          const result = await register(data);
          console.log(result);
          
        } catch (error) {
          console.log(error);
          console.log("errorpr")
        }
      }
  return (
    <div>
      <section>
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input name='firstName' required/>
                <label>First Name</label>
            </div>
            <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='lastName' required/>
                <label>Last Name</label>
            </div>
            <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='email' required/>
                <label>Email</label>
            </div>
            <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='password' required/>
                <label>Password</label>
            </div>
            <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='confirmPassword' required/>
                <label>Confirm Password</label>
            </div>
            <div className="forget">
                <label><input type="checkbox"/>Remember Me</label>
                <a href="#">Forget Password</a>
            </div>
            <button>Register</button>
            <div className="register">
                <p>Do you already have an account? <Link href="/login">Log in.</Link></p>
            </div>

            </form>
        </section>
    </div>
  )
}

export default RegisterForm
