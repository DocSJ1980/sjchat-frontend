import { useSelector } from "react-redux"
import Login from "./pages/login"
import { selectCurrentToken, selectMode, selectPersist } from "./features/auth/authSlice"
import { useEffect, useRef } from "react"
import { useRefreshMutation } from "./features/auth/authApiSlice"
import { Navigate, Route, Routes } from "react-router-dom"
import MainChat from "./pages/MainChat"
import { ToastContainer } from "react-toastify"

function App() {
  const persist = useSelector(selectPersist)
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const mode = useSelector(selectMode)
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
      <div className="App overflow-hidden text-black bg-gray-100 p-4 overflow-y-hidden">
        <div className="absolute top-0 right-0 w-56 h-36 rounded-full bg-yellow-300 filter blur-3xl" />
        <div className="absolute top-36 left-0 w-56 h-36 rounded-full bg-yellow-300 filter blur-3xl" />
        <ToastContainer theme={mode} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={token ? <Navigate to="/welcome" replace /> : <Login />} />
          <Route path="/welcome" element={!token ? <Navigate to="/login" replace /> : <MainChat />} />
        </Routes >
      </div>
  }
  return content
}

export default App
