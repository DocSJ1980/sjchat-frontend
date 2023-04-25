import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useProfileMutation } from '../features/auth/authApiSlice'
import { getMessages } from '../api/messageRequests'
import { format } from 'timeago.js'
import InputEmoji from '@xbc/react-input-emoji'

const ChatBox = ({ chat, currentUser }) => {
    const [userData, setuserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [profile] = useProfileMutation()
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await profile({ userId })
                setuserData(data.foundUser)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData()

    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {

                const data = await getMessages(chat?._id)
                setMessages(data)
                console.log(messages)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleOnEnter = (newMessage) => {
        console.log(newMessage)
    }

    return (
        <>
            <div class="ChatBox-container bg-cardColor rounded-lg grid grid-rows-3">
                {chat ? (

                    <>
                        <div class="chat-header py-4 px-4">
                            <div class="follower flex justify-between items-center">
                                <img
                                    // src={
                                    //   userData?.profilePicture
                                    //     ? `${process.env.REACT_APP_PUBLIC_FOLDER}/${userData.profilePicture}`
                                    //     : `${process.env.REACT_APP_PUBLIC_FOLDER}/defaultProfile.png`
                                    // }
                                    src='src\assets\user.png'
                                    alt="Profile"
                                    className="followerImage w-12 h-12 mr-4 my-4"
                                />
                                <div className="name flex flex-col items-start justify-center pr-4" style={{ fontSize: '0.8rem' }}>
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
                            <hr className="w-85 border-gray-300" />
                        </div>
                        <div class="chat-body flex flex-col flex-grow flex-shrink-0">
                            {messages?.map((message) => (
                                <div key={message?._id} class={
                                    message.senderId === currentUser ? "bg-gradient-to-r from-blue-400 to-cyan-500 rounded-tr-xl rounded-bl-xl rounded-br-xl self-end p-3 max-w-2xl w-auto flex flex-col gap-2 mr-4" : "message bg-buttonBg text-white p-2 rounded-tr-xl rounded-bl-xl rounded-br-xl max-w-28 w-auto flex flex-col gap-2"
                                }>
                                    <span>{message?.text}</span>
                                    <span>{format(message?.createdAt)}</span>
                                </div>
                            ))}
                        </div>
                        <div class="chat-sender bg-white flex justify-between h-14 items-center gap-4 p-2 mr-8 mb-4 rounded-lg self-end w-3/4 flex-shrink-0 flex-grow-0 fixed bottom-0">
                            <div>TODO</div>
                            <InputEmoji
                                className="h-70 bg-gray-300 rounded-md border-none outline-none flex-1 text-sm px-4"
                                value={newMessage}
                                onChange={setNewMessage}
                                cleanOnEnter
                                onEnter={handleOnEnter}
                                placeholder="Type a message"
                            />
                            <button class="bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500 text-white font-bold py-2 px-4 rounded-full border-4 border-transparent ">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <span>Click on a chat to start conversation</span>
                )}
            </div >
        </>
    )
}

export default ChatBox