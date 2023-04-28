import React from "react";
import Logo from "../img/logo.png";
import { UilSearch } from '@iconscout/react-unicons'

const LogoSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <img src={Logo} alt="" className="w-auto h-auto" />
            {/* <div className="flex items-center flex-grow bg-gray-200 rounded-lg px-2">
                <input
                    type="text"
                    placeholder="#Explore"
                    className="bg-transparent border-none outline-none focus:ring-0 focus:outline-none w-full"
                />
                <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 rounded-md ml-2 p-1 text-white">
                    <UilSearch />
                </div>
            </div> */}
        </div>);
};

export default LogoSearch;
