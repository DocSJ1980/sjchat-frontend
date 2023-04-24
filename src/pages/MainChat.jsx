import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../api/chatRequests';
import Conversation from '../components/conversation';
import { selectCurrentToken, selectUser } from '../features/auth/authSlice';

const MainChat = () => {
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])
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

    return (
        <div class="relative grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 col-span-1">
                <div class="flex flex-col gap-4 bg-cardColor rounded-lg p-4 h-auto min-h-screen overflow-y-scroll">
                    <h2 className="text-lg font-bold text-gray-700">Chats</h2>
                    <div className="">
                        {chats.map((chat) => (
                            <Conversation key={chat._id} data={chat} currentUserId={user._id} />
                        ))}
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 col-span-3">

            </div>
        </div>
    );
};

export default MainChat;
