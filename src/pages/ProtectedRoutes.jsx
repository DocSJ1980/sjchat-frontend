import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectCurrentToken, selectPersist } from '../features/auth/authSlice'
import { useRefreshMutation } from '../features/auth/authApiSlice'

export default function ProtectedRoutes() {
    const persist = useSelector(selectPersist)
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()
    const effectRan = useRef(false)

    const token = useSelector(selectCurrentToken)
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

    return (
        !token ? <Navigate to="/login" replace /> : <Outlet />
    )
}
