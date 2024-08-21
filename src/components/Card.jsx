import React from 'react';

const Card = ({ title, value, svg, color }) => {
    return (
        <div className={`p-4 shadow-md rounded-lg flex flex-col items-center text-center ${`bg-${color}-200`}`}>
             <span>{svg}</span>
            <h2 className={` text-lg font-semibold`}>{value}</h2>
            <p className={`text-sm font-semibold `}>{title}</p>
           
        </div>
    );
}

export default Card;