import ReviewCard from "../components/ReviewCard.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import {useEffect, useState} from "react";
import * as client from "../utilities/APIService.ts"
import type {Leader} from "../utilities/LeaderType.ts";


const ViewReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [leaders, setLeaders] = useState<Leader[]>([])
    const [selectedLeaderId, setSelectedLeaderId] = useState<number | "all">("all")

    useEffect(() => {
        const fetchData = async () => {
            const [fetchedReviews, fetchedLeaders] = await Promise.all([
                client.getReviews(),
                client.getLeaders()
            ])
            setReviews(fetchedReviews)
            setLeaders(fetchedLeaders)
        }
        fetchData()
    }, []);

    console.log("selected:", selectedLeaderId, typeof selectedLeaderId)
    console.log("review leader id:", reviews[0]?.leader?.id, typeof reviews[0]?.leader?.id)

    const filteredReviews = selectedLeaderId === "all"
        ? reviews
        : reviews.filter(r => r.leader.id === selectedLeaderId)

    return (
        <div>
            <select
                value={selectedLeaderId}
                onChange={(e) => {
                    const val = e.target.value
                    setSelectedLeaderId(val === "all" ? "all" : Number(val))
                }}
            >
                <option value={"all"}>All Leaders</option>
                {leaders.map(leader => (
                    <option key={leader.id} value={leader.id}>
                        {leader.fname} {leader.lname}
                    </option>
                ))}
            </select>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 justify-items-center"}>
                {
                    filteredReviews.map((review) => (
                        <ReviewCard key={review.id}
                                    date={review.date}
                                    rating={review.rating}
                                    description={review.description}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ViewReviews;