import StarRatingItem from "./StarRatingItem.tsx";

type ReviewProps = {
    date: Date,
    rating: number,
    description: string
}

const ReviewCard = ({date, rating, description} : ReviewProps) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    return (
        <div className={"flex flex-col w-50 border rounded bg-white p-2 wrap-break-word"}>
            <p>{formatted}</p>
            <div id="starRating" className="flex items-center justify-center space-x-1">
                <StarRatingItem rating={rating}/>
            </div>
            <div className={"flex-col items-center md:items-start"}>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ReviewCard;