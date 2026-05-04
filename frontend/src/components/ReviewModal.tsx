import React from 'react';
import ReviewCard from "./ReviewCard.tsx";
import StarRatingItem from "./StarRatingItem.tsx";

const ReviewModal = () => {
    return (
        <div className={"fixed flex flex-row w-screen h-screen justify-center inset-0 items-center z-50"}>
        <div className="group select-none w-1/2 h-1/2 flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
            <div className={""}>
                <p>{new Date(Date.now()).toDateString()}</p>
                <div id="starRating" className="flex items-center justify-center space-x-1">
                    <StarRatingItem rating={5}/>
                </div>
                <div className={"flex-col items-center md:items-start"}>
                    <p>{"Cool dude"}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ReviewModal;