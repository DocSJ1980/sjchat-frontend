import { apiSlice } from "../../api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials },
            })
        }),
        signUp: builder.mutation({
            query: ({ name, email, password, gender, profileImage }) => {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('gender', gender);
                formData.append('profile_image', profileImage);

                return {
                    url: '/user/new',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/user/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        profile: builder.mutation({
            query: ({ userId }) => ({
                url: '/user/userdetail',
                method: 'POST',
                body: { userId },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // console.log(arg)
                try {
                    const { data } = await queryFulfilled
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useProfileMutation
} = authApiSlice 