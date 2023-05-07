import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { UilSearch, UilCommentAltPlus } from '@iconscout/react-unicons'
import SearchModal from "./searchModal"

const LogoSearch = ({ open, setNewChat, newChat }) => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    }

    return (
        <div className="flex items-center justify-center my-5">
            <button className="bg-orange-500 w-full text-center dark:hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mx-auto" onClick={handleButtonClick} style={{ minWidth: '100px' }}>
                <div className="flex items-center justify-center">
                    {open ? (
                        <div className="flex items-center justify-center transition-all duration-300">
                            <UilCommentAltPlus size="1.5em" className="mr-2" />
                            <h1>Start New Chat</h1>
                        </div>
                    ) : (
                        <UilCommentAltPlus size="1.5em" className="transition-all duration-300" />
                    )}
                </div>
            </button>
            {showModal && <SearchModal setShowModal={setShowModal} setNewChat={setNewChat} newChat={newChat} />}
        </div>
    );




};

export default LogoSearch;
