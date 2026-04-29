import axios from "axios";
import type {Leader} from './LeaderType.ts'
import type {Review, ReviewPost} from "./ReviewTypes.ts";

const client = axios.create();

export const getLeaders = async (): Promise<Leader[]> => {
    return await client.get<Leader[]>(("api/v1/leader/all")).then(r => r.data);
}

export const postLeaders = async (leader: Leader): Promise<Leader> => {
    return await client.post<Leader>("api/v1/leader", leader).then(r => r.data);
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