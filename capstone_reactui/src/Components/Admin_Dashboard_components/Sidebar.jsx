import React from 'react';
import './Admincss.css';
import {
    BsCart3,
    BsGrid1X2Fill,
    BsEnvelopeFill,
    BsPeopleFill,
    BsFillPersonBadgeFill,
    BsBellFill,
    BsBarChartFill,
    BsFillGearFill,
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <img style={{ height: '100px', width: '100px' , marginLeft:'30px' }} src="Utils/image copy.png" />
                </div>

                <span className="icon close_icon" onClick={OpenSidebar}>
                    X
                </span>
            </div>

            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a href="/dashboard1">
                        <BsGrid1X2Fill className="icon" /> Dashboard
                    </a>
                </li>
                
                <li className="sidebar-list-item">
                    <a href="/users">
                        <BsPeopleFill className="icon" /> Users
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="/providers">
                        <BsFillPersonBadgeFill className="icon" /> Providers
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="/notifications">
                        <BsBellFill className="icon" /> Notifications
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="/weeklydata">
                        <BsBarChartFill className="icon" /> Reports
                    </a>
                </li>
               
            </ul>
        </aside>
    );
}

export default Sidebar;
