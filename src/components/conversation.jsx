import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../features/auth/authApiSlice'
import defaultProfile from '../assets/user.png'

const Conversation = ({ open, data, currentUserId, online }) => {
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
            <div key={data._id} className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <div className="relative flex items-center flex-1">
                    {online && (
                        <div className="online-dot absolute top-0 left-0 w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <div className={`${open && "mr-4"} ${!open && "min-w-12"}`}>

                        <img
                            src={userData?.avatar?.url ? userData.avatar.url : defaultProfile}
                            alt="Profile"
                            className="inline-block w-12 h-12 rounded-full "
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={`${!open && "hidden"} text-slate-800 dark:text-slate-300 origin-left duration-200`}>
                            {userData?.name}
                        </span>
                        <span style={{ color: online ? '#51e200' : '#566573' }} className={`${!open && "hidden"} `}>
                            {(online) ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>
            <hr className="w-85 border-gray-300" />
        </>
    )
}

export default Conversation