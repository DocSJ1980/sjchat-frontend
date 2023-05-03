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


function App() {
  const persist = useSelector(selectPersist)
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const mode = useSelector(selectMode)
  console.log('%cApp.jsx line:19 mode', 'color: white; background-color: #007acc;', mode);
  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {
    if (!effectRan.current) {
      const verifyRefreshToken = async () => {
        try {
          await refresh()
        }
        catch (err) {
          console.error(err)
        }
      }
      if (!token && persist) {
        console.log('No token running verifyRefreshToken')
        verifyRefreshToken()
      }
      effectRan.current = true
      console.log('Token present logging in')
    }
  }, [])

  let content
  if (isLoading) {
    content = <p>Loading ....</p>
  } else {
    content =
      <div className="App overflow-x-hidden text-black bg-gray-100 dark:bg-gray-800">
        <div className="absolute top-0 right-0 w-56 h-36 rounded-full bg-yellow-300 filter blur-3xl" />
        <div className="absolute top-36 left-0 w-56 h-36 rounded-full bg-yellow-300 filter blur-3xl" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={token ? <Navigate to="/welcome" replace /> : <Login />} />
          <Route path="/welcome" element={!token ? <Navigate to="/login" replace /> : <MainChat />} />
          <Route path="/email-verify" element={Email_Verification} />
        </Routes >
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
  }
  return content
}

export default App
