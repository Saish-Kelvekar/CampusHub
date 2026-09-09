
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
    
  return (
    <>
      <Navbar 
      />

      <main>
        {/* Hero */}
        <Hero/>

        {/* Features */}
        <Features/>

        {/* About */}
        <About/>

        

      </main>

      <Footer/>
    </>
  )
}

export default Home
