import StarRatingItem from "./StarRatingItem.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";

type ReviewProps = {
    review : Review
    setReview: (review : Review) => void;
    openModal : (bool : boolean) => void;
}

const ReviewCard = ({review, setReview, openModal} : ReviewProps) => {
    const date = review.date;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    return (
        <div onClick={() => {setReview(review); openModal(true)}} className={"flex flex-col w-50 border rounded bg-white hover:bg-gray-200 p-2 wrap-break-word hover:cursor-pointer"}>
            <p>{formatted}</p>
            <div id="starRating" className="flex items-center justify-center space-x-1">
                <StarRatingItem rating={review.rating}/>
            </div>
            <div className={"flex-col items-center md:items-start"}>
                <p>{review.description}</p>
            </div>
        </div>
    );
};

export default ReviewCard;