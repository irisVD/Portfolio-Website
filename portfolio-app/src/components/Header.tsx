import React from 'react';
import "../App.scss";
import { AiOutlineMoon } from "react-icons/ai";
import { AiOutlineSun } from "react-icons/ai";
import GB from 'country-flag-icons/react/3x2/GB';
import NL from 'country-flag-icons/react/3x2/NL';

interface HeaderProps{
  setDarkMode: (value: boolean) => void;
}

const Header = (props : HeaderProps) => {
  return (
    <>
        <div className='title-part'>
          <h1>Iris Van Damme</h1>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className='darkmode'>
              <button
                onClick={() => props.setDarkMode(true)}>
                <AiOutlineMoon size={24} className='moon-icon'/>
              </button>
              
              <button
                onClick={() => props.setDarkMode(false)}>
                <AiOutlineSun size={24} className='sun-icon'/>
              </button>
            </div>
            <div className='languages'><GB />/<NL /></div>
          </div>
          
        </div>
        
        <div className="menu">
          <div>About me</div>
          <div>Projects</div>
          <div>Skills</div>
          <div>Contact</div>
        </div>
    </>
    
  )
}

export default Header