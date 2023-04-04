import React, { useState } from 'react'


const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Implement login functionality
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // TODO: Implement signup functionality
    };

    const handleSignupToggle = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };


    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 overflow-y-hidden flex shadow-lg max-w-3xl p-5">
                <div className="sm:w-1/2 mr-5">
                    <h2 className="font-bold text-2xl">Login</h2>
                    <p className="text-sm mt-4">
                        Already a member? Log in
                    </p>
                    <form
                        onSubmit={isSignup ? handleSignup : handleLogin}
                        className="flex flex-col gap-4"
                    >
                        {isSignup && (
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-8"
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-2 border-gray-300 rounded-xl p-2 w-full mt-8"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                            />
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                width="16"
                                height="16"
                                fill="gray"
                                className="bi bi-eye-slash absolute top-9 right-3 -translate-y-1/2 cursor-pointer"
                                viewBox="0 0 16 16"
                            >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                        </div>
                        {isSignup && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-8"
                            />
                        )}
                        <button className="bg-[#0FED3C] hover:bg-green-500 text-white font-bold py-2 px-4 rounded-2xl mt-4">
                            {isSignup ? 'Sign Up' : 'Log In'}
                        </button>
                    </form>
                    <div className='mt-3 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='text-gray-500' />
                        <p className='text-center text-sm'>OR</p>
                        <hr className='text-gray-500' />
                    </div>
                    <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm'>
                        <img src='src\assets\icons8-google.svg' alt='google' className='mr-3' width="25px" />
                        Login with Google
                    </button>
                    <p className='text-xs mt-5 border-b border-gray-400 py-4'>Forgot your password? </p>
                    <div className='mt-3 text-xs flex justify-between items-center'>
                        <p >If you don't have an account...</p>
                        <button className='py-2 px-5 bg-white border rounded-xl' onClick={handleSignupToggle} >Register</button>
                    </div>
                </div>
                <div className="w-1/2 sm:block  hidden justify-center items-center ">
                    <div className='h-full flex justify-center items-center'>

                        <img src='src\assets\loginpage.jpg' className='rounded-2xl  ' alt='login image' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
