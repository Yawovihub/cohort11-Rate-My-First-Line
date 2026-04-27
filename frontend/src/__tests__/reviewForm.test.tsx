import {render, screen, waitFor} from '@testing-library/react';
import ReviewForm from "../components/ReviewForm.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import * as apiService from "../utilities/APIService.ts";
import {userEvent} from "@testing-library/user-event/dist/cjs/index.js";

describe('Submit Review Form Testing', () => {

    const user = userEvent.setup();

    let date: Date = new Date("2026-01-01");
    const initialReview : Review = {id: 1, leaderId: 1, rating: 5, description: "test", date: date
    };

    it('should display header', () => {

        render(<ReviewForm/>);
        screen.findByRole('button');
        screen.findByRole('textbox');

        expect(
            screen.getByRole('button', {name: /submit/i}),
        ).toBeInTheDocument();

    });

    it('should type into description and submit from FE to BE', async () => {

        const reviewSubmitTest = vi.spyOn(apiService, 'postReviews').mockResolvedValue(initialReview)

        render(<ReviewForm/>)
        const description = screen.getByRole('textbox', {name: /input/i});

        const submit = screen.getByRole('button', {name: /button/i});

        await user.type(description, "test");
        expect(description).toHaveDisplayValue("test");

        await user.click(submit);

        // THIS DOES NOT WORK :(
        await waitFor(() => {
            expect(reviewSubmitTest).toHaveBeenCalledOnce();
        });

        screen.logTestingPlaygroundURL();
    });

});
