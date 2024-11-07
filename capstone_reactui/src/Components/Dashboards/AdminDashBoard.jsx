import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../Admin_Dashboard_components/Header';
import Home from '../Admin_Dashboard_components/Home';
import Sidebar from '../Admin_Dashboard_components/Sidebar';


function AdminDashBoard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
    </div>

  )
}

export default AdminDashBoard;

