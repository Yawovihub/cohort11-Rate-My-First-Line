import type {Review} from "../utilities/ReviewTypes.ts";
import * as client from '../utilities/APIService.ts'
import ViewReviews from "../pages/ViewReviews.tsx";
import {render, screen} from "@testing-library/react";

vi.mock("../utilities/APIService.ts");

describe('View Reviews Test', () => {
    let reviewOne : Review
    let reviews : Review[]

    beforeEach(() => {
        reviewOne = {
            id: 1,
            leader:{
                id: 1
            } ,
            date: new Date(Date.now()),
            rating: 10,
            description: "test"
        }
        reviews = [reviewOne]
        vi.mocked(client.getReviews).mockResolvedValue(reviews);
    })

    it('should render all reviews', async () => {
        render(<ViewReviews/>);
        const description = await screen.findByText(/test/i);
        expect(description).toBeInTheDocument();
        expect(await screen.findByText(/\d+\/\d+\/\d+/)).toBeInTheDocument();
        expect(document.querySelector('#starRating'));
        screen.logTestingPlaygroundURL();
    })
})