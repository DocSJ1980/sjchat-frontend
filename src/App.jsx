import { useSelector } from "react-redux"
import Login from "./pages/Login"
import { selectCurrentToken, selectMode, selectPersist } from "./features/auth/authSlice"
import { useEffect, useRef } from "react"
import { useRefreshMutation } from "./features/auth/authApiSlice"
import { Navigate, Route, Routes } from "react-router-dom"
import MainChat from "./pages/MainChat"
import { ToastContainer } from "react-toastify"
import "./App.css";
import Email_Verification from "./pages/Email_Verification"
import 'react-toastify/dist/ReactToastify.css';
import React from "react"
import ThemeChanger from "./components/themeChanger"
import ProtectedRoutes from "./pages/ProtectedRoutes"


function App() {
  // const persist = useSelector(selectPersist)
  // const token = useSelector(selectCurrentToken)
  // const effectRan = useRef(false)
  const mode = useSelector(selectMode)
  console.log('%cApp.jsx line:19 mode', 'color: white; background-color: #007acc;', mode);
  // const [refresh, {
  //   isUninitialized,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // }] = useRefreshMutation()

  // useEffect(() => {
  //   if (!effectRan.current) {
  //     const verifyRefreshToken = async () => {
  //       try {
  //         await refresh()
  //       }
  //       catch (err) {
  //         console.error(err)
  //       }
  //     }
  //     if (!token && persist) {
  //       console.log('No token running verifyRefreshToken')
  //       verifyRefreshToken()
  //     }
  //     effectRan.current = true
  //     console.log('Token present logging in')
  //   }
  // }, [])

  return (
    <div className="App overflow-x-hidden text-black bg-gray-100 dark:bg-gray-800" >
      <div className="absolute top-0 left-0 mt-1 " style={{ zIndex: 999 }}>
        <ThemeChanger />
      </div>
      <div className="absolute top-0 right-0 w-56 h-36 rounded-full bg-orange-300 filter blur-3xl" />
      <div className="absolute top-36 left-0 w-56 h-36 rounded-full bg-orange-300 filter blur-3xl" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/email-verify" element={<Email_Verification />} />
          <Route path="/welcome" element={<MainChat />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
    </div>

  )
}

export default App
