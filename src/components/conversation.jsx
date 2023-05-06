import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../features/auth/authApiSlice'

const Conversation = ({ data, currentUserId, online }) => {
    const [userData, setuserData] = useState(null)
    const [profile] = useProfileMutation()
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await profile({ userId })
                setuserData(data.foundUser)
                // console.log('%cconversation.jsx line:13 data.foundUser', 'color: white; background-color: #007acc;', data.foundUser);
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <div className="conversation flex justify-between items-center p-4 rounded hover:bg-gray-300 cursor-pointer">
                <div className="relative flex items-center flex-1">
                    {online && (
                        <div className="online-dot absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <img
                        src={userData?.avatar?.url ? userData.avatar.url : "src/assets/user.png"}
                        alt="Profile"
                        className="inline-block w-12 h-12 rounded-full mr-4"
                    />
                    <div className="name flex flex-col items-start justify-center dark:text-gray-300 text-lg font-bold" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.name}</span>
                        <span style={{ color: online ? '#51e200' : '' }}>
                            {online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>
            <hr className="w-85 border-gray-300" />
        </>
    )
}

export default Conversation