import React from 'react';

const Button = (props) => {
    return (
        <div>
            {props.rating.map((item, index) => 
                <button 
                    key={index} 
                    onClick={() => props.calculateAverage(item)}
                >
                    {item}
                </button>)
            }
        </div>
    );
};

export default Button;