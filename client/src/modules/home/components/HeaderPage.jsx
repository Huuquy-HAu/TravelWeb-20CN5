import React from 'react'
import logoImgage from '../../../img/LogoProject.png'

function HeaderPage() {
  return (
    <div className='header-page'>
        <div className="left-container">
          <div className="logo">
              <img src={logoImgage} alt="" />
          </div>
        </div>
        <div className="right-container"></div>
    </div>
  )
}

export default HeaderPage