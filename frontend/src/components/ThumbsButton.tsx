import React, {useState} from 'react';

const ThumbsButton = () => {
const [counter, setCounter ]= useState(0);
const handleCount = ()=>{
    setCounter(count=>count+1)
}

    return (
        <button onClick={handleCount}>
            {"\u{1F44D}"}
        <p aria-label={"counter"}>{counter}</p>
        </button>
    );
};

export default ThumbsButton;