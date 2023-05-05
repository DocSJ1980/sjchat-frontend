import React, { useState } from "react";
import Logo from "../img/logo.png";
import { UilSearch, UilCommentAltPlus } from '@iconscout/react-unicons'
import SearchModal from "./searchModal"

const LogoSearch = () => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    }

    return (
        <div className="flex items-center gap-10">
            <img src={Logo} alt="" className="w-auto h-auto" />
            <div className="flex items-center flex-grow bg-gray-200 rounded-lg">
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded flex items-center" onClick={handleButtonClick}>
                    Start New Chat
                    <div className="ml-5">
                        <UilCommentAltPlus />
                    </div>
                </button>
            </div>
            {showModal && <SearchModal setShowModal={setShowModal} />}
        </div>
    );
};

export default LogoSearch;
