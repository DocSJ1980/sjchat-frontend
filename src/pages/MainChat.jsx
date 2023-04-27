import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../api/chatRequests';
import ChatBox from '../components/chatBox';
import Conversation from '../components/conversation';
import { selectUser } from '../features/auth/authSlice';
import { io } from 'socket.io-client';
import LogoSearch from '../components/logoSearch';

const MainChat = () => {
    const user = useSelector(selectUser)
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)

    useEffect(() => {
        socket.current = io("http://localhost:8800")
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
        <div className="relative grid grid-cols-4 gap-4 overflow-y-hidden">
            <div className="flex flex-col gap-1 col-span-1 overflow-y-hidden h-screen">
                <LogoSearch />
                <div className="flex flex-col gap-4 bg-cardColor rounded-lg p-4 h-full overflow-y-auto">
                    <h2 className="text-lg font-bold text-gray-700">Chats</h2>
                    <div className="">
                        {user && chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation key={chat._id} data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 col-span-3">
                <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
            </div>
        </div>
    );
};

export default MainChat;
