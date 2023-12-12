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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.signin} element={<LoginPage />} />
          <Route path={ROUTES.signup} element={<SignUpPage />} />

          <Route path={ROUTES.home} element={<HomePage />} >
            <Route path={ROUTES.home} element={<Home />} />
          </Route>
          <Route path={"*"} element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
