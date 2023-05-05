import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../api/chatRequests';
import ChatBox from '../components/chatBox';
import Conversation from '../components/conversation';
import { selectUser } from '../features/auth/authSlice';
import { io } from 'socket.io-client';
import LogoSearch from '../components/logoSearch';
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import ThemeChanger from '../components/themeChanger';
import { toast } from 'react-toastify';

const MainChat = () => {
    const user = useSelector(selectUser)
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const [sendLogout] = useSendLogoutMutation()


    useEffect(() => {
        socket.current = io("http://localhost:5230")
        socket.current.emit("new-user-add", user._id)
        //create socket on event to get-users
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users)
        })

    }, [user])

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage)
        }

    }, [sendMessage])

    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            setReceiveMessage(data)
        })
    }, [])

    const handleSendLogout = async () => {
        const { message } = await sendLogout().unwrap()
        toast.success(message)
        socket.current.emit("log-out", user._id)
    }

    useEffect(() => {
        const getChats = async () => {
            try {
                const response = await userChats(user._id)
                setChats(response)
                // console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        if (user) getChats()
    }, [user])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    }


    return (
        <div className="relative grid grid-cols-4 gap-4">
            <div className="left-side-chat flex flex-col gap-1 col-span-1 h-screen pt-4 pl-4">
                <div className="w-full flex justify-evenly items-center">
                    <LogoSearch />
                </div>
                <div className="flex flex-col gap-4 bg-cardColor rounded-lg p-4 h-full overflow-y-auto">
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Chats</h2>
                    <div className="">
                        {user && chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation key={chat._id} data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-sender bg-gray-300 flex justify-between h-14 items-center gap-4 px-4 mr-3 ml-10 rounded-lg self-end flex-shrink-0 flex-grow-0 bottom-0 w-full overflow-y-hidden ">
                    <img
                        src='src\assets\user.png'
                        alt="Profile"
                        className="followerImage w-12 h-12"
                    />
                    <p className='text-slate-800 text-lg font-bold'>{user.name}</p>
                    {/* <ThemeChanger /> */}
                    <UilSignOutAlt color="#fca61f" size="24" onClick={handleSendLogout} className="hover:gray-500 cursor-pointer rounded-full" />
                </div>
            </div>
            <div className="right-side-chat flex flex-col gap-4 col-span-3">
                <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
            </div>
        </div>
    );
};

export default MainChat;
