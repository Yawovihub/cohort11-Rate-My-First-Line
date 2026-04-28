import {render, screen, waitFor} from '@testing-library/react';
import ReviewForm from "../components/ReviewForm.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import * as apiService from "../utilities/APIService.ts";
import {userEvent} from "@testing-library/user-event";

describe('Submit Review Form Testing', () => {

    const user = userEvent.setup();

    let date: Date = new Date("2026-01-01");
    const initialReview : Review = {id: 1, leader:{id: 1}, rating: 5, description: "test", date: date
    };

    it('should display header', () => {

        render(<ReviewForm isOpen={false} onClose={function(): void {
            throw new Error("Function not implemented.");
        } }/>);
        screen.findByRole('button');
        screen.findByRole('textbox');
        screen.logTestingPlaygroundURL()
        expect(
            screen.getByRole('button', {name: /submit/i}),
        ).toBeInTheDocument();

    });

    it('should type into description and submit from FE to BE', async () => {

        const reviewSubmitTest = vi.spyOn(apiService, 'postReviews').mockResolvedValue(initialReview)

        render(<ReviewForm isOpen={false} onClose={function(): void {
            throw new Error("Function not implemented.");
        } }/>)
        const description = screen.getByRole('textbox', {name: /input/i})

        const submit = screen.getByRole('button', {name: /submit/i});

        await user.type(description, "test");

        expect(description).toHaveDisplayValue("test");

        await user.click(submit);

        // THIS DOES NOT WORK :(
            expect(reviewSubmitTest).toHaveBeenCalledOnce();

        screen.logTestingPlaygroundURL();
    });

});
