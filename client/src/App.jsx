import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './config/routes'
import LoginPage from './modules/auth/page/LoginPage'
import SignUpPage from './modules/auth/page/SignUpPage'
import HomePage from './modules/home/page/HomePage'
import NotFoundPage from './modules/notFound/page/NotFoundPage'
import Home from './modules/home/components/Home'
import PrivateRoute from './modules/auth/components/PrivateRoute'
import ProtectedRoute from './modules/auth/components/ProtectedRoute'
import UserPage from './modules/user/page/UserPage'
import UserProfile from './modules/user/components/UserProfile'
import UserMenu from './modules/user/components/UserMenu'
import AdminPage from './modules/admin/page/AdminPage'
import AllTour from './modules/admin/components/AllTour'
import AddTour from './modules/admin/components/AddTour'
import AllBooking from './modules/admin/components/AllBooking'
import SearchPage from './modules/search/page/SearchPage'
import ChangePassword from './modules/user/components/ChangePassword'
import AllBookingForUser from './modules/user/components/AllBookingForUser'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.signin} element={<PrivateRoute />}>
            <Route path={ROUTES.signin} element={<LoginPage />} />
          </Route>

          <Route path={ROUTES.signup} element={<PrivateRoute />}>
            <Route path={ROUTES.signup} element={<SignUpPage />} />
          </Route>

          <Route path={ROUTES.home} element={<ProtectedRoute />}>
            <Route path={ROUTES.home} element={<HomePage />} >
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.search} element={<SearchPage />} />
            </Route>
            <Route path={ROUTES.user} element={<UserPage />}>
              <Route path={ROUTES.user} element={<UserProfile />} />
              <Route path={ROUTES.user_change_password} element={<ChangePassword />} />
              <Route path={ROUTES.user_tour} element={<AllBookingForUser />} />

            </Route>

            <Route path={ROUTES.admin} element={<AdminPage />}>
              <Route path={ROUTES.allTour} element={<AllTour />} />
              <Route path={ROUTES.addTour} element={<AddTour />} />
              <Route path={ROUTES.allBooking} element={<AllBooking />} />
            </Route>
          </Route>

          <Route path={"*"} element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
