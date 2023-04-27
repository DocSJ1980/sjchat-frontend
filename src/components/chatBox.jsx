import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useProfileMutation } from '../features/auth/authApiSlice'
import { addMessage, getMessages } from '../api/messageRequests'
import { format } from 'timeago.js'
import InputEmoji from '@xbc/react-input-emoji'

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setuserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [profile] = useProfileMutation()
    const scroll = useRef()
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

    const handleOnEnter = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }
        //send message to database
        try {
            const data = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    }

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (

        <div className="ChatBox-container flex flex-col w-full max-h-screen overflow-y-hidden">
            {chat ? (
                <>
                    <div className="chat-header bg-gray-300 py-4 px-4 mr-4 mt-2 ml-0 mb-1 border rounded-xl max-h-28 overflow-y-hidden" >
                        <div className="follower flex justify-start items-center overflow-y-hidden">
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
                            <div className="name flex flex-col " style={{ fontSize: '0.8rem' }}>
                                <span>
                                    {userData?.name}
                                </span>
                            </div>
                            <hr className="w-85 border-gray-300" />
                        </div>
                    </div>
                    <div className="chat-body flex flex-col flex-1 overflow-y-auto">
                        {messages?.map((message) => (
                            <div ref={scroll} key={message?._id} className={
                                message.senderId === currentUser ? "bg-gradient-to-r from-blue-600 to-cyan-300 rounded-tr-xl rounded-bl-xl rounded-br-xl self-end p-3 max-w-2xl w-auto flex flex-col gap-2 my-1 mr-4" : "bg-gradient-to-r from-orange-300 to-orange-600 rounded-tl-xl rounded-br-xl rounded-bl-xl self-start p-3 max-w-2xl w-auto flex flex-col gap-2 my-1 ml-4"
                            }>
                                <span>{message?.text}</span>
                                <span>{format(message?.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chat-sender bg-gray-300 flex justify-between h-14 items-center gap-4 px-4 mr-3 ml-10 rounded-lg self-end flex-shrink-0 flex-grow-0 bottom-0 w-full overflow-y-hidden">
                        <div>TODO</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={setNewMessage}
                            cleanOnEnter
                            placeholder="Type a message"
                        />
                        <button className="bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500 text-white font-bold py-2 px-4 rounded-full border-4 border-transparent" onClick={handleOnEnter}>
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <span>Click on a chat to start conversation</span>
            )}
        </div >

    )
}

export default ChatBox