import { useSelector } from "react-redux"
import Login from "./pages/login"
import { selectCurrentToken, selectMode, selectPersist } from "./features/auth/authSlice"
import { useEffect, useRef } from "react"
import { useRefreshMutation } from "./features/auth/authApiSlice"
import { Navigate, Route, Routes } from "react-router-dom"
import MainChat from "./pages/MainChat"

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
    if (effectRan.current === true) return
    if (effectRan.current === false) {
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
      return () => {
        effectRan.current = true
        console.log('Token present logging in')
      }
    }

  }, [])

  let content
  if (isLoading) {
    content = <p>Loading ....</p>
  } else {
    content =
      <div className="App">
        {/* <ThemeProvider theme={darkTheme} >
          <Box bgcolor={"background.default"} color={"text.primary"} height="100%" minHeight="100vh">
            <ToastContainer theme={mode} /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={(token != null && !isLoading) ? (<Navigate to="/welcome" replace />) : (<Login />)} />
          <Route path="/welcome" element={(token === null && !isLoading) ? (<Navigate to="/login" replace />) : (<MainChat />)} />
        </Routes >
        {/* </Box>
        </ThemeProvider> */}
      </div>

    return content
  }
}
export default App
