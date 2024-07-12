import React from 'react'

import mount from '../../assests/mountain.mp4';
import planeImg from '../../assests/plane3.png';

const Home = () => {
  return (
    <div className='home flex container'>
        
        <div className="maintext">
            <h1>Create Ever-lasting Memories with us</h1>
        </div>

        <div className="homeImages flex">
            <div className="vediodiv">
                <video src={mount} className='video' autoPlay muted loop> </video>
            </div>

            <img src={planeImg} className='plane' />
        </div>
    </div>
  )
}

export default Home
