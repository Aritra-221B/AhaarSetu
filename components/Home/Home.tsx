import React from 'react'
import Tutorial from './Tutorial/Tutorial'
import Hero from './Hero/Hero'
import Features from './Features/Features'
import FaqsSection from './FaqsSection/FaqsSection'
import About from './About/About'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Hero/>
      <Tutorial/>
      <About/>
      <Features/>
      <FaqsSection/>
    </div>
  )
}

export default Home