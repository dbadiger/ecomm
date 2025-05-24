import React from 'react'
// import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetterBox'
import HeroSlider from '../components/HeroSlider'

const Home = () => {
  return (
    <div>
      <HeroSlider/>
      {/* <Hero/> */}
      <LatestCollections/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Home
