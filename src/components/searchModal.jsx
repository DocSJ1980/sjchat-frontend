import { useState, useEffect, useRef } from 'react';
import { UilSearch, UilCommentAltPlus, UilTimes } from '@iconscout/react-unicons';
import { createChat, searchUsers } from '../api/chatRequests'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import defaultProfile from '../assets/user.png'

const SearchModal = (props) => {
    const { setShowModal, setNewChat, newChat } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const modalRef = useRef(null);
    const currentUser = useSelector(selectUser)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStartChat = async (userId) => {
        // Logic to start chat with user
        try {
            const chat = await createChat(currentUser._id, userId)
            // Logic to open the new chat with the user
            setShowModal(false)
            setNewChat(newChat + 1)
            toast.success(chat.message)

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    };

    useEffect(() => {
        const handleSearchUsers = async () => {
            try {
                const results = await searchUsers(searchTerm);
                console.log('%csearchModal.jsx line:22 results', 'color: white; background-color: #007acc;', results.foundUsers);
                setSearchResults(results.foundUsers);
            } catch (error) {
                console.error(error);
            }
        };
        if (searchTerm.length >= 3) handleSearchUsers();
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowModal]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-slate-300 dark:bg-slate-700 w-96 rounded-md p-5 absolute top-1/4 " ref={modalRef}>
                <div className="flex items-center gap-5 mb-5">
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <UilSearch />
                        </span>
                        <input
                            type="text"
                            className="pl-10 w-full py-2 border-b text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 border-gray-300 dark:border-gray-500 focus:outline-none"
                            placeholder="Search for a user"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button onClick={() => setShowModal(false)}>
                        <UilTimes />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-96">
                    {searchResults?.length > 0 && searchResults.map((user) => (
                        <div key={user._id} className="flex items-center gap-3 mb-3">
                            <img src={user?.avatar?.url ? user.avatar.url : defaultProfile} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-grow">
                                <div className="font-semibold text-center text-slate-800 dark:text-slate-200 ">{user.name}</div>
                            </div>
                            <button
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={() => handleStartChat(user._id)}
                            >
                                Start Chat
                            </button>
                        </div>

                    ))}
                </div>
            </div>


        </div>
    );
};

export default SearchModal;
