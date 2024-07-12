import React, { useState } from 'react';

import {SiConsul} from 'react-icons/si';
import {BsPhoneVibrate} from 'react-icons/bs';
import {AiOutlineGlobal} from 'react-icons/ai';
import {CgMenuGridO} from 'react-icons/cg';

import logo from '../../assests/logo.png';

const Navbar = () => {

    const[active,setActive] = useState('navbar-menu');

    const showNavBar = () => {
        setActive('showNavbar navbar-menu');
        console.log(active)
    }

    const removeNavBar = () => {
        setActive('navbar-menu');
    }

  return (
    <div className='navbar flex'>
        <div className="navbar-one flex">
            <div>
                <SiConsul className='icon'/>
            </div>

            <div className="middle flex">
                <li className="flex"> <BsPhoneVibrate className='icon'/> Support</li>
                <li className="flex"> <AiOutlineGlobal className='icon'/> Languages</li>
            </div>

            <div className="atb flex">
                <span>Sign In</span>
                <span>Sign Out</span>
            </div>
        </div>

        <div className="navbar-two flex">
            <div className="logo-div">
                <img src={logo} className='logo'/>
            </div>

            <div className={active}>
                <ul className="menu flex">
                    <li onClick={removeNavBar} className="list-item">Home</li>
                    <li onClick={removeNavBar} className="list-item">About</li>
                    <li onClick={removeNavBar} className="list-item">Offers</li>
                    <li onClick={removeNavBar} className="list-item">Seats</li>
                    <li onClick={removeNavBar} className="list-item">Destenations</li>
                </ul>

                <button onClick={removeNavBar} className="btn flex btnOne">
                    Contact
                </button>
            </div>

            <button className="btn flex btnTwo">
                Conatct
            </button>

            <div onClick={showNavBar} className="toggleIcon">
                <CgMenuGridO  className='icon none'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
