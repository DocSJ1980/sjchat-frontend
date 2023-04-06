import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        mode: 'light',
        persist: false,
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
        },
        // removeMutationResult(state, action) {
        //     const { requestId } = action.payload;
        //     const newState = { ...state };
        //     console.log(newState)
        //     delete newState[requestId];
        //     return newState;
        // }
    }
})

export const { setCredentials, setMode, setPersist, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectMode = (state) => state.auth.mode
export const selectPersist = (state) => state.auth.persist
