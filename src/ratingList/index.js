import React from 'react';

const RatingList = (props) => {
    return (
        <div>
            {props.rating.map((rating, index) => 
                <button 
                    className={props.selectedRating === rating ? `active` : null}
                    key={index} 
                    onClick={() => props.selectRating(rating)}
                >
                    {rating}
                </button>)
            }
        </div>
    );
};

export default RatingList;