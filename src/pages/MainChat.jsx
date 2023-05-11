import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../api/chatRequests';
import ChatBox from '../components/chatBox';
import { selectUser } from '../features/auth/authSlice';
import { io } from 'socket.io-client';
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import { UilSignOutAlt } from '@iconscout/react-unicons';
import Conversation from '../components/conversation';
import LogoSearch from '../components/logoSearch';

const MainChat = () => {
    const user = useSelector(selectUser)
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [newChat, setNewChat] = useState(0)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const [sendLogout] = useSendLogoutMutation()

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [open, setOpen] = useState((isMobile ? false : true));
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        setOpen(!isMobile)
    }, [isMobile]);



    useEffect(() => {
        socket.current = io("https://sjchat-backend.onrender.com")
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
    }, [user, newChat])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    }


    return (
        <div className="flex ">

            <div
                className={` ${open ? "w-72 min-w-20" : "w-20 "
                    }  h-screen pt-8 relative duration-300`}
            >
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-slate-800 dark:text-slate-300 origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        sjChat
                    </h1>
                </div>
                <div className="pt-6 justify-items-stretch" >
                    <LogoSearch open={open} setNewChat={setNewChat} newChat={newChat} />
                    {user && chats.map((chat) => (
                        <div onClick={() => setCurrentChat(chat)}>
                            <Conversation open={open} data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                        </div>
                    ))}
                </div>
                <div className="chat-sender bg-gray-300 flex justify-between h-14 items-center gap-1 px-4  absolute  rounded-lg self-end flex-shrink-0 flex-grow-0 bottom-0 w-full overflow-y-hidden ">
                    {open && <><img
                        src={user?.avatar?.url ? user.avatar.url : "src/assets/user.png"}
                        alt="Profile"
                        className="inline-block w-12 h-12 rounded-full"
                    />
                        <p className='text-slate-800 text-lg font-bold'>{user.name}</p></>}
                    <UilSignOutAlt color="#fca61f" size="36" onClick={handleSendLogout} className="hover:gray-500 cursor-pointer rounded-full" />
                </div>
            </div>
            <div className="h-screen flex-1 pl-7">
                <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
            </div>
        </div>
    );
};

export default MainChat;
