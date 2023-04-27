import React from "react";
import Logo from "../img/logo.png";
import { UilSearch } from '@iconscout/react-unicons'

const LogoSearch = () => {
    return (
        <div className="flex gap-3">
            <img src={Logo} alt="" width="50px" height="50px" />
            <div className="flex items-center bg-gray-200 rounded-lg px-2 ">
                <input type="text" placeholder="#Explore" className="bg-transparent border-none outline-none focus:ring-0 focus:outline-none" />
                <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 rounded-md ml-2 p-1 text-white">
                    <UilSearch />
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;
