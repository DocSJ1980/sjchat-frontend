import React from 'react'

const Email_Verification = () => {
    return (
        <div className='text-3xl text-orange-600 flex flex-col items-center pt-10 gap-5 h-screen'>
            <h1>Email Verification</h1>
            <input
                className="flex h-10 w-1/2 rounded-md border border-orange-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                disabled=""
                placeholder="Paste email verification token here" />
            <button
                className="rounded-md border border-orange-600 w-1/4 px-3.5 py-1.5 text-base font-semibold leading-7 text-orange-600 hover:bg-orange-300">
                Submit
            </button>
        </div>
    )
}

export default Email_Verification