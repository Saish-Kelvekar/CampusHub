import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Home = () => {
    const[isLoginOpen,setIsLoginOpen]=useState(false);
    const[isSignupOpen,setIsSignupOpen]=useState(false);
  return (
    <>
      <Navbar 
      onLogin={()=>setIsLoginOpen(true)}
      onSignup={()=>setIsSignupOpen(true)}/>

      <main>
        {/* Hero */}
        <Hero/>

        {/* Features */}
        <Features/>

        {/* About */}
        <About/>

        <Login 
        isOpen={isLoginOpen}
        onClose={()=>{
            console.log("Home: login clicked")
            setIsLoginOpen(false)}}
        />
        <Signup 
        isOpen={isSignupOpen}
        onClose={()=>setIsSignupOpen(false)}
        />
      </main>

      <Footer/>
    </>
  )
}

export default Home
