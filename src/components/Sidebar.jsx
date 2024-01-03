// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import images from '../images.png';
const Sidebar = () => {

    return (
        <div className=" text-white  min-h-screen w-64  p-4" style={{ backgroundColor: '#015249' }}>
            <div className="text-2xl font-bold mb-4">
                <img src={images}></img>
            </div>
            <ul>
                <li className="mb-2">
                    <Link to="/" className="hover:text-gray-300">Customers</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
