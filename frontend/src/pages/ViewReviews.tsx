import ReviewCard from "../components/ReviewCard.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import {useEffect, useState} from "react";
import * as client from "../utilities/APIService.ts"



const ViewReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const fetchReviews = async () => {
        setReviews(await client.getReviews())
    }
    useEffect(()=>{
        fetchReviews()
    }, [])
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 justify-items-center"}>
            {
                reviews &&
                reviews.map((review) => {
                    return <ReviewCard key={review.id} date={review.date} rating={review.rating} description={review.description}/>
                })
            }
        </div>
    );
};

export default ViewReviews;