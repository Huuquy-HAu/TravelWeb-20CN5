import React from 'react'
import HeaderPage from '../../home/components/HeaderPage'
import { Outlet } from 'react-router'
import "../scss/Header.scss"
import UserMenu from '../components/UserMenu'

function UserPage() {
  return (
    <div className='UserPage'>
        <HeaderPage/>
        <UserMenu/>
    </div>
  )
}

export default UserPage