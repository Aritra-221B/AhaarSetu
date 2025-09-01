import React from 'react'
import Counter from './Counter/Counter'
import Hero from './Hero/Hero'
import FoundersDesk from './FoundersDesk/FoundersDesk'
import Reviews from './Reviews/Reviews'
import FaqsSection from './FaqsSection/FaqsSection'
import AboutTwo from './AboutTwo/AboutTwo'
import Teacher from './Teacher/Teacher'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Hero/>
      <AboutTwo/>
      <Counter/>
      <FoundersDesk/>
      <Reviews/>
      <Teacher/>
      <FaqsSection/>
    </div>
  )
}

export default Home