import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useOnlineUsers = (userId) => {
    const socketRef = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socketRef.current = io("http://localhost:5230");
        socketRef.current.emit("new-user-add", userId);

        socketRef.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [userId]);

    return onlineUsers;
};
