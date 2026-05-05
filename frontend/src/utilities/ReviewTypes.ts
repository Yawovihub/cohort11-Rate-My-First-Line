export type Review = {
    id: number;
    leader: {
        id : number;
    }
    rating: number;
    description: string;
    date: Date
}

export type ReviewPost = {
    leader: {
        id : number,
    }
    rating: number,
    description: string,
    date: string
}

export type ReviewCommentPost ={
        review_id: number;
        reviewComment: string | undefined;
}