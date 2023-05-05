import React, { useState } from 'react'
import { useVerifyMutation } from '../features/auth/authApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UilSpinnerAlt, UilClipboardAlt } from '@iconscout/react-unicons'


const Email_Verification = () => {
    const [verify, { isLoading }] = useVerifyMutation()
    const [verifyToken, setVerifyToken] = useState('')
    const navigate = useNavigate()

    const handleVerify = async () => {
        try {
            const { message } = await verify(verifyToken).unwrap()
            toast.success(message)
            navigate('/welcome')
        } catch (error) {
            toast.error(error.data?.message)
            console.log(error)
        }
    }

    const handlePaste = () => {
        navigator.clipboard.readText().then(text => {
            setVerifyToken(text)
        })
    }

    return (
        <div className='text-3xl text-orange-600 flex flex-col items-center pt-10 gap-5 h-screen'>
            <h1>Email Verification</h1>
            <div className="flex items-center w-1/2">
                <input
                    className="flex h-10 w-full rounded-md border border-orange-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    disabled=""
                    value={verifyToken}
                    onChange={(e) => setVerifyToken(e.target.value)}
                    placeholder="Paste email verification token here" />
                <button
                    className="rounded-md h-10 border border-orange-600 py-2 px-3 mx-2 text-base font-semibold leading-7 text-orange-600 hover:bg-orange-300"
                    onClick={handlePaste}
                >
                    <UilClipboardAlt />
                </button>
            </div>
            <button
                onClick={handleVerify}
                className="rounded-md border border-orange-600 w-1/4 px-3.5 py-1.5 text-base font-semibold leading-7 text-orange-600 hover:bg-orange-300" disabled={(isLoading)}>
                {(isLoading) ? (
                    <div className="flex items-center justify-center">
                        <UilSpinnerAlt className="h-7 w-6    rounded-full animate-spin" />
                    </div>
                ) : (
                    <span>Submit</span>
                )}
            </button>
        </div>
    )
}

export default Email_Verification
