import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ThemeChanger from '../components/themeChanger';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useSignUpMutation } from '../features/auth/authApiSlice';
import { UilEye } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import { setCredentials } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login, { isLoading: loginLoading }] = useLoginMutation()
    const [signUp, { isLoading: signUpLoading }] = useSignUpMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
            gender: '',
        },
        validationSchema: yup.object().shape({
            fullName: yup.string()
                .when('isSignup', {
                    is: true,
                    then: yup.string()
                        .min(3, 'Full name should be at least 3 characters.')
                        .max(50, 'Full name should be at most 50 characters.')
                        .required('Full name is required.'),
                    otherwise: yup.string()
                        .min(3, 'Full name should be at least 3 characters.')
                        .max(50, 'Full name should be at most 50 characters.')
                }),
            email: yup.string()
                .email('Invalid email address.')
                .required('Email address is required.'),
            password: yup.string()
                .min(8, 'Password should be at least 8 characters.')
                .required('Password is required.'),
            confirmPassword: yup.string()
                .when('isSignup', {
                    is: true,
                    then: yup.string()
                        .oneOf([yup.ref('password'), null], 'Passwords do not match.')
                        .required('Confirm password is required.'),
                    otherwise: yup.string()
                        .oneOf([yup.ref('password'), null], 'Passwords do not match.')
                }),
            gender: yup.string()
                .when('isSignup', {
                    is: true,
                    then: yup.string()
                        .required('Gender is required.'),
                    otherwise: yup.string()
                })
        }),
        onSubmit: async (values) => {
            try {
                // submit form data here
                if (isSignup) {
                    const { accessToken, user } = await signUp({
                        name: values.fullName,
                        email: values.email,
                        password: values.password,
                        gender: values.gender,
                        profileImage: profileImage,
                    }).unwrap()
                    dispatch(setCredentials({ accessToken, user }))
                    navigate('/email-verify')
                }
                if (!isSignup) {
                    const { accessToken, user } = await login({
                        email: values.email,
                        password: values.password,
                    }).unwrap()
                    dispatch(setCredentials({ accessToken, user }))
                    navigate('/welcome')
                }
            } catch (error) {
                console.error(error);
                toast(error.data?.message)
            }
        },
    });

    const handleSignupToggle = () => {

        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const { accessToken, user } = await login({ ...formData }).unwrap()
            dispatch(setCredentials({ accessToken, user }))
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
    const handleSignup = async () => {
        e.preventDefault();
        console.log(profileImage)
        try {
            const { accessToken, user } = await signUp({
                name: formik.values.fullName,
                email: formik.values.email,
                password: formik.values.password,
                gender: formik.values.gender,
                profileImage: profileImage,
            }).unwrap()
            dispatch(setCredentials({ accessToken, user }))
            navigate('/email-verify')
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
                    <form onSubmit={formik.handleSubmit}>
                        {isSignup && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                                    placeholder="Enter full name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                />
                                {formik.touched.fullName && formik.errors.fullName ? (
                                    <div className="error">{formik.errors.fullName}</div>
                                ) : null}
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                                placeholder="Enter email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                                placeholder="Enter password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <div className="absolute top-9 right-3 -translate-y-1/2 cursor-pointer">

                                {!showPassword ? <UilEyeSlash color="#B2BEB5" onClick={() => setShowPassword(!showPassword)} /> : <UilEye color="#B2BEB5" onClick={() => setShowPassword(!showPassword)} />}
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        {isSignup && (
                            <div className="form-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className="border-2 border-gray-300 rounded-xl p-2 w-full mt-4"
                                    placeholder="Confirm password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="error">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>)}
                        {isSignup && (

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="file"
                                    name="profile_image"
                                    className="border-2 border-gray-300 rounded-xl p-2 w-1/2 mt-4 mr-2"
                                    onChange={(e) => {
                                        setProfileImage(e.target.files[0]);
                                    }}
                                />
                                <select
                                    name="gender"
                                    className="border-2 border-gray-300 rounded-xl p-2 w-1/2 mt-4"
                                    placeholder='Select Gender'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.gender}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {formik.touched.gender && formik.errors.gender ? (
                                    <div className="error">{formik.errors.gender}</div>
                                ) : null}
                            </div>
                        )}
                        <button className={`bg-[#0FED3C] hover:bg-green-500 w-full text-white font-bold py-2 px-4 rounded-2xl mt-4 ${(loginLoading || signUpLoading) ? 'opacity-50 cursor-not-allowed' : ''}`} type='submit' disabled={(loginLoading || signUpLoading)}>
                            {(loginLoading || signUpLoading) ? (
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
                    <button onClick={() => toast("Toast Working")} className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm'>
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
    );
};

export default Login;