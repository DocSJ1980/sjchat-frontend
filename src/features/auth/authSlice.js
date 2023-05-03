import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        mode: 'light',
        persist: true,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user } = action.payload
            state.token = accessToken
            state.user = user
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
        setPersist: (state, action) => {
            const { persist } = action.payload
            state.persist = persist
        },
        logOut: (state, action) => {
            state.token = null
            state.mode = ''
            state.persist = false
            state.user = null
        }
    }
})

export const { setCredentials, setMode, setPersist, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectMode = (state) => state.auth.mode
export const selectPersist = (state) => state.auth.persist
export const selectUser = (state) => state.auth.user