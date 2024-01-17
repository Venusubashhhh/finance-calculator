import React, { useEffect, useState } from 'react'
import HistoryCard from '../../components/UI/HistoryCard/HistoryCard'
import NavBar from '../../components/UI/Navbar/Navbar'



const HistoryPage = () => {

    
  return (
    <>
    <NavBar/>
    <div style={{marginTop:"70px"}}><HistoryCard/></div>

    </>
  )
}

export default HistoryPage