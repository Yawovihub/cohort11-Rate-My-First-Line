import {describe} from "vitest";
import ViewReviews from "../pages/ViewReviews.tsx";
import * as client from "../utilities/APIService.ts"
import type {Leader} from "../utilities/LeaderType.ts";
import type {Review} from "../utilities/ReviewTypes.ts";
import {render, screen} from "@testing-library/react";
import {userEvent as user} from '@testing-library/user-event'
import type {ReviewComment} from "../utilities/ReviewCommentType.ts";
import {getByRole} from "@testing-library/dom";



vi.mock("../utilities/APIService.ts")

describe('Comment form testing', ()=> {
    const leader: Leader[] = [{
      id: 1,
        fname: "Groot",
        lname: "Grooter",
        jobTitle: "Grooting"
    }]

    const review: Review[] =[{
        id: 1,
        leader: {id:1},
        rating: 5,
        description: "Groot groots your Groot",
        date: new Date(Date.now())
    }]

    const reviewComment: ReviewComment[] = [{
        id:1,
        reviewComment: "Grooted in the groot"
    }]

    const reviewComment2: ReviewComment[] = [
        {id:1,
        reviewComment: "Grooted in the groot"},
        {id:2,
        reviewComment: "Get Grooting"}
    ]



    vi.mocked(client.getLeaders).mockResolvedValue(leader)
    vi.mocked(client.getReviews).mockResolvedValue(review)
    vi.mocked(client.getReviewComments).mockResolvedValue(reviewComment)
    vi.mocked(client.postReviewComment)




    it('should should display a reviewed review', async () => {

        render(<ViewReviews></ViewReviews>)


       await screen.findByRole('combobox')
           screen.logTestingPlaygroundURL();
        expect(screen.getByText(/6\/4\/2026/i)).toBeInTheDocument();


    })

    it('should should display modal', async () => {

        render(<ViewReviews></ViewReviews>)


        await screen.findByRole('combobox')
        const card = screen.getByText(/6\/4\/2026/i)
        await user.click(card)
        screen.logTestingPlaygroundURL();
        expect(screen.getByRole('textbox')).toBeInTheDocument()


    })



    it('It should display the Review comments', async () => {

        render(<ViewReviews></ViewReviews>)


        await screen.findByRole('combobox')
        const card = screen.getByText(/6\/4\/2026/i)
        await user.click(card)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        expect(screen.getByText(/grooted in the groot/i)).toBeInTheDocument()


        screen.logTestingPlaygroundURL();


    })

    it('When we type into the comment box it will hold the value', async () => {

        render(<ViewReviews></ViewReviews>)


        await screen.findByRole('combobox')
        const card = screen.getByText(/6\/4\/2026/i)
        await user.click(card)
        const comment = screen.getByRole('textbox')
        await user.type(comment, "Get Grooting")
        expect(screen.getByRole('textbox')).toHaveValue("Get Grooting")

        screen.logTestingPlaygroundURL();

    })
    it('When we click submit it should post', async () => {

        render(<ViewReviews></ViewReviews>)


        await screen.findByRole('combobox')
        const card = screen.getByText(/6\/4\/2026/i)
        await user.click(card)
        const comment = screen.getByRole('textbox')
        await user.type(comment, "Get Grooting")
        expect(screen.getByRole('textbox')).toHaveValue("Get Grooting")
        vi.mocked(client.getReviewComments).mockResolvedValue(reviewComment2)
        await user.click(screen.getByRole('button', { name: /submit/i }))
        expect(screen.getByText(/grooted in the groot/i)).toBeInTheDocument()
        expect(screen.getByText(/Get Grooting/i)).toBeInTheDocument()
        screen.logTestingPlaygroundURL();

    })



})