
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
        <div>
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