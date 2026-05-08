import {vi} from "vitest";
import * as client from '../utilities/APIService.ts'
import {type Leader} from '../utilities/LeaderType.ts';
import type {Review} from "../utilities/ReviewTypes.ts";
import type {ReviewComment} from "../utilities/ReviewCommentType.ts";

vi.mock("../utilities/APIService.ts");
const reviewCommentUpvoteSpy = vi.spyOn(client,"postUpvote" )
const reviewCommentDownvoteSpy = vi.spyOn(client,"postDownvote" )
const postSpy = vi.spyOn(client, "postLeaders");
const spy = vi.spyOn(client, "getLeaders")
const reviewSpy = vi.spyOn(client, "getReviews");
const reviewPostSpy = vi.spyOn(client, "postReviews");
describe('Leader Service', () => {
    let leaderOne : Leader
    let leaders : Leader[]
    let reviewOne : Review
    let reviews : Review[]
    let reviewComment: ReviewComment;

    beforeEach(() =>{
        leaderOne = {
            id: 1,
            fname: "George",
            lname: "Of the Jungle",
            jobTitle: "Battalion Commander"
        }
        leaders = [leaderOne]
        reviewOne = {
            id: 1,
            rating: 5,
            description: "Watch out for that tree!",
            date: new Date(2023, 5, 27)
        }
        reviews = [reviewOne];
        reviewComment = {
            id: 1,
            reviewComment: "First review comment"
        }
        vi.mocked(client.getLeaders).mockResolvedValue(leaders);
        vi.mocked(client.postLeaders).mockResolvedValue(leaderOne);
        vi.mocked(client.getReviews).mockResolvedValue(reviews);
        vi.mocked(client.postReviews).mockResolvedValue(reviewOne);
        vi.mocked(client.postUpvote).mockResolvedValue(reviewComment);
        vi.mocked(client.postDownvote).mockResolvedValue(reviewComment)
    })
    it('should get all leaders', async () => {
        //Arrange
        const foundLeaders : Leader[] = await client.getLeaders();
        expect(foundLeaders[0].jobTitle).toStrictEqual(leaders[0].jobTitle)
        expect(spy).toHaveBeenCalledOnce()
    });


    it('should post a leader', async () => {
        const response : Leader = await client.postLeaders(leaderOne)
        expect(response.id).toEqual(leaderOne.id);
        expect(postSpy).toHaveBeenCalledOnce();
    });

    it('should get all reviews', async () => {
        // Arrange
        const foundReviews : Review[] = await client.getReviews();
        expect(foundReviews[0].rating).toEqual(reviewOne.rating);
        expect(reviewSpy).toHaveBeenCalledOnce();
    })

    it('should post a review', async () => {
        const response : Review = await client.postReviews(reviewOne)
        expect(response.id).toEqual(reviewOne.id);
        expect(reviewPostSpy).toHaveBeenCalledOnce();
    })

    it('should post an upvote', async() => {
        const response: ReviewComment = await client.postUpvote(1, 1)
        expect(response).not.toBeNull()
        expect(reviewCommentUpvoteSpy).toHaveBeenCalledOnce()

    });
    it('should post an downvote', async() => {
        const response2: ReviewComment = await client.postDownvote(1, 1)
        expect(response2).not.toBeNull()
        expect(reviewCommentDownvoteSpy).toHaveBeenCalledOnce()

    });

});


