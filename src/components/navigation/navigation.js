import React from 'react';

const Navigation = ({onRouteChange}) =>{
    return(
        <div>
        <nav className='flex justify-end'>
            <p 
            //below syntax uses arrow fn as we dont want run the function while mounting
            //we need to run only on click
            onClick= {()=>onRouteChange('signin')}
            className='ma3 mb0 pa2 b input-reset ba b--black bg-transparent pointer f5 dib'
            >Sign Out</p>
        </nav>
        </div>
    )

}

export default Navigation;