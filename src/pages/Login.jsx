import React from 'react'

const Login = () => {
    return (
        <div className='bg-gray-50  min-h-screen flex items-center justify-center'>
            <div className="bg-gray-100 overflow-y-hidden flex shadow-lg max-w-3xl p-5">
                <div className="sm:w-1/2 mr-5">
                    <h2 className='font-bold text-2xl'>Login</h2>
                    <p className='text-sm mt-4'>If you are already a member, easily log in</p>
                    <form action='' className='flex flex-col gap-4'>
                        <input type="email" placeholder='Email' className='border-2 border-gray-300 rounded-xl p-2 w-full mt-8' />
                        <div className='relative'>
                            <input type="password" placeholder='Password' className='border-2 border-gray-300 rounded-xl p-2 w-full mt-4' />
                            <svg xmlns='http://w3.org/2000/svg' width="16" height="16" fill='#CED2BA' class='bi bi-eye absolute top-1/2 right-0 -translate-y-1/2' viewBox='0 0 16 16' />
                        </div>
                        <button className='bg-[#0FED3C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mt-4 '>Login</button>
                    </form>
                    <div className='mt-3 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='text-gray-500' />
                        <p className='text-center'>OR</p>
                        <hr className='text-gray-500' />
                    </div>
                </div>
                <div className="w-1/2 sm:block hidden">
                    <img src='src\assets\loginpage.jpg' className=' rounded-2xl' alt='login image' />
                </div>

            </div>
        </div>
    )
}

export default Login
