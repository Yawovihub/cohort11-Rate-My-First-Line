import axios from "axios";
import type {Leader} from './LeaderType.ts'
import type {Review, ReviewCommentPost, ReviewPost} from "./ReviewTypes.ts";
import type {ReviewComment} from "./ReviewCommentType.ts";

const client = axios.create();

export const getLeaders = async (): Promise<Leader[]> => {
    return await client.get<Leader[]>(("api/v1/leader/all")).then(r => r.data);
}

export const postLeaders = async (leader: Leader): Promise<Leader> => {
    return await client.post<Leader>("/api/v1/leader", leader).then(r => r.data);
}

export const getReviewsByLeaderId = async (leaderId: number) : Promise<Review[]> => {
    return await client.get<Review[]>(`api/v1/review/leader/${leaderId}`).then(r => r.data);
}

export const getReviews = async (): Promise<Review[]> => {
    return await client.get<Review[]>("api/v1/review").then(r => {
        const data = r.data;
        return data.map(
            review => ({
                ...review,
                date: new Date(review.date)
            })
        )
    });
}

export const postReviews = async (review: ReviewPost): Promise<Review> => {
    return await client.post<Review>("api/v1/review", review).then(r => r.data);
}

export const getReviewComments = async (): Promise<ReviewComment[]> =>{
    return await client.get<ReviewComment[]>("api/v1/reviewComment").then(rc => {
        const data = rc.data;
        return data.map(
            reviewComment => ({
                ...reviewComment
            })
        )
    })
}

export const postReviewComment = async (reviewComment: ReviewCommentPost): Promise<ReviewComment> => {
    return await client.post<ReviewComment>("api/v1/reviewComment", reviewComment).then( rc => rc.data);
}


export const deleteReviewComment = async (id: number) => {
    try {
        await client.delete(`api/v1/reviewComment/${id}`).then(rc =>rc.data)
    } catch (error) {
        console.error('Error deleting review comment:', error);
        throw error;
    }
};