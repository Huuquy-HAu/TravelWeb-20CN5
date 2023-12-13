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
            </Route>
          </Route>

          <Route path={"*"} element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
