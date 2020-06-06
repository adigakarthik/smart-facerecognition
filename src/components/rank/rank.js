import React from 'react';

const Rank = ({user}) => {
    const {name,entries} = user;
    return (
        <div>
            <div className='white f4 mb0'>
                {name}, your current image entry is
                <span className='white f3'>#{entries}</span>
            </div>
        </div>
    )
}

export default Rank;