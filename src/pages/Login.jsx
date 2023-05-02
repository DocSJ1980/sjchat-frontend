import React, { useRef, useState } from 'react'
import { useLoginMutation, useSignUpMutation } from '../features/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPersist, setCredentials } from '../features/auth/authSlice';
import ThemeChanger from '../components/themeChanger';
import { UilEye } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
        gender: '',
    });
    const [profileImage, setProfileImage] = useState(null)
    const userRef = useRef()
    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')
    const persist = useSelector(selectPersist)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const [signUp, { isLoading: signUpLoading }] = useSignUpMutation()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const { accessToken, user } = await login({ ...formData }).unwrap()
            dispatch(setCredentials({ accessToken, user }))
            setUsername('')
            setPassword('')
            navigate('/welcome')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            if (errRef && errRef.current) {
                errRef.current.focus();
            }
        }
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(profileImage)
        try {
            const { accessToken, user } = await signUp({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                profileImage: profileImage,
            }).unwrap()
            dispatch(setCredentials({ accessToken, user }))
            setUsername('')
            setPassword('')
            navigate('/welcome')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            if (errRef && errRef.current) {
                errRef.current.focus();
            }
        }
    };
    const handleSignupToggle = () => {
        setFormData({
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
            gender: '',
        })
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };


    return (
        <div className=" min-h-screen flex items-center justify-center relative">
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <ThemeChanger />
            </div>
            <div className="bg-gray-100 dark:bg-gray-600 border-gray-900 rounded-2xl overflow-y-hidden flex shadow-lg dark:shadow-2xl max-w-3xl p-5">
                <div className="sm:w-1/2 mr-5">
                    <h2 className="font-bold text-2xl dark:text-gray-300 mb-4">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </h2>
                    {/* <p className="text-sm mt-4 mb-4">
                        {isSignup ? 'No Account? Sign Up' : 'Already a member? Log in'}

                    </p> */}
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
                                ref={errRef}
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            ref={errRef}
                            className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                ref={errRef}
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                            />

                            <div className="absolute top-9 right-3 -translate-y-1/2 cursor-pointer">

                                {!showPassword ? <UilEyeSlash color="#B2BEB5" onClick={() => setShowPassword(!showPassword)} /> : <UilEye color="#B2BEB5" onClick={() => setShowPassword(!showPassword)} />}
                            </div>
                        </div>
                        {isSignup && (
                            <>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    ref={errRef}
                                    className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                                />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        name="profile_image"
                                        onChange={(e) => {
                                            setProfileImage(e.target.files[0]);
                                        }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                        <label style={{ marginRight: '10px' }}>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                onChange={handleChange}
                                            />
                                            Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                onChange={handleChange}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>


                            </>
                        )}

                        <button className={`bg-[#0FED3C] hover:bg-green-500 text-white font-bold py-2 px-4 rounded-2xl mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <UilSpinnerAlt className="h-7 w-6    rounded-full animate-spin" />
                                </div>
                            ) : (
                                <span>{isSignup ? 'Sign Up' : 'Log In'}</span>
                            )}
                        </button>


                    </form>
                    <div className='mt-3 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='text-gray-500' />
                        <p className='text-center text-sm dark:text-gray-300'>OR</p>
                        <hr className='text-gray-500' />
                    </div>
                    <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm'>
                        <img src='src\assets\icons8-google.svg' alt='google' className='mr-3' width="25px" />
                        Login with Google
                    </button>
                    <p className='text-xs mt-5 border-b border-gray-400 py-4 dark:text-gray-300'>Forgot your password? </p>
                    {isSignup ? <>
                        <div className='mt-3 text-xs flex justify-between items-center'>
                            <div className="dark:text-gray-300">
                                <p >Already have an account...</p>
                            </div>
                            <button className='py-2 px-5 bg-white border rounded-xl' onClick={handleSignupToggle} >Login</button>
                        </div>
                    </> : <>
                        <div className='mt-3 text-xs flex justify-between items-center'>
                            <div className="dark:text-gray-300">
                                <p >If you don't have an account...</p>
                            </div>
                            <button className='py-2 px-5 bg-white border rounded-xl' onClick={handleSignupToggle} >Register</button>
                        </div>
                    </>}
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
