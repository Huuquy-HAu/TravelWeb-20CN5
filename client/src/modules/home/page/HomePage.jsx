import React from 'react'
import HeaderPage from '../components/HeaderPage'
import FooterPage from '../components/FooterPage'
import '../scss/HomePage.scss'

function HomePage() {
  return (
    <div className='homePage-container'>
      <HeaderPage />
      HomePage
      <FooterPage />
    </div>
  )
}

export default HomePage