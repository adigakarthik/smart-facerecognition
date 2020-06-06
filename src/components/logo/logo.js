import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain_logo from  './brain_logo.png'

const Logo = () =>{
    return(
        <div className='ma3 mb0 mt0'>
            <Tilt className="Tilt br3 shadow-3" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa2">
                    <img src={brain_logo} alt='logo'></img>
                </div>
            </Tilt>
        </div>
    )

}

export default Logo;