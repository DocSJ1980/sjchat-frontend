import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        mode: 'light',
        persist: true,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        setMode: (state, action) => {
            const { mode } = action.payload
            state.mode = mode
        },
        setPersist: (state, action) => {
            const { persist } = action.payload
            state.persist = persist
        },
        logOut: (state, action) => {
            state.token = null
            state.mode = 'light'
            state.persist = false
        }
    }
})

export const { setCredentials, setMode, setPersist, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth ? state.auth.token : null
export const selectMode = (state) => state.auth ? state.auth.mode : "light"
export const selectPersist = (state) => state.auth ? state.auth.persist : false;
