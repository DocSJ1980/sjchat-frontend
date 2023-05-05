import { useSelector } from "react-redux"
import Login from "./pages/Login"
import { selectMode } from "./features/auth/authSlice"
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
  const mode = useSelector(selectMode)

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
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="welcome" element={<MainChat />} />
          <Route path="email-verify" element={<Email_Verification />} />
          <Route path="*" element={<Navigate to="/welcome" />} />
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
