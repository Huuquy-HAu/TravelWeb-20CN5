import React from 'react'
import HeaderPage from '../components/HeaderPage'
import FooterPage from '../components/FooterPage'
import '../scss/HomePage.scss'
import Home from '../components/Home';
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div className='homePage-container'>
      <HeaderPage />
      <Outlet/>
      <FooterPage />
    </div>
  )
}

export default HomePage