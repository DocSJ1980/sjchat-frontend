import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useProfileMutation } from '../features/auth/authApiSlice'

const ChatBox = ({ chat, currentUser }) => {
    const [userData, setuserData] = useState(null)
    const [profile] = useProfileMutation()
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await profile({ userId })
                setuserData(data.foundUser)
                console.log(userData)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData()

    }, [chat, currentUser])
    return (
        <>
            <div className="ChatBox-Container">
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <img
                                // src={
                                //   userData?.profilePicture
                                //     ? `${process.env.REACT_APP_PUBLIC_FOLDER}/${userData.profilePicture}`
                                //     : `${process.env.REACT_APP_PUBLIC_FOLDER}/defaultProfile.png`
                                // }
                                src='src\assets\user.png'
                                alt="Profile"
                                className="followerImage w-12 h-12 mr-4"
                            />
                            <div className="name flex flex-col items-start justify-center" style={{ fontSize: '0.8rem' }}>
                                <span>
                                    {userData?.name}
                                </span>
                                <span style={{ color: "#51e200" }}>
                                    {/* <span style={{ color: online ? "#51e200" : "" }}> */}
                                    {/* {online? "Online" : "Offline"} */}
                                    Online
                                </span>
                            </div>
                        </div>

                    </div>
                    <hr className="w-85 border-gray-300" />
                </>
            </div>
        </>
    )
}

export default ChatBox