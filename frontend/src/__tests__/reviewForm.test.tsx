import { render, screen, waitFor} from '@testing-library/react';
import ReviewForm from "../components/ReviewForm.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import * as apiService from "../utilities/APIService.ts";
import {userEvent} from "@testing-library/user-event";
import type {Leader} from "../utilities/LeaderType.ts";

vi.mock('../APIService.ts');

describe('Submit Review Form Testing', () => {

    const user = userEvent.setup();

    const date: Date = new Date("2026-01-01");
    const initialReview : Review = {
        id: 1,
        leader:{
            id: 1
        },
        rating: 5,
        description: "test",
        date: date
    };
    const arrayReviews = [initialReview];

    const getLeaders : Leader = {id: 1, fname: "Chuma", lname: "Humphrey", jobTitle: "big_dawg"};
    const arrayLeaders = [getLeaders];

    vi.mocked(apiService.postReviews);

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
        const getLeadersTest = vi.spyOn(apiService, 'getLeaders').mockResolvedValue(arrayLeaders);
        const reviewSubmitTest = vi.spyOn(apiService, 'postReviews').mockResolvedValue(initialReview);

        // Change isOpen to true so the form doesn't reset itself
        render(<ReviewForm isOpen={true} onClose={vi.fn()} />);

        // 1. Wait for the loading state to disappear and the select to be available
        const selectElement = await screen.findByRole('combobox');

        // 2. Use native user.selectOptions for the standard <select> element
        // We select by the value (id) which is what react-hook-form expects
        await user.selectOptions(selectElement, initialReview.leader.id.toString());

        const description = await screen.findByRole('textbox', {name: /input/i});
        await user.type(description, "test");

        const dateInput = screen.getByLabelText(/date:/i);
        await user.clear(dateInput);
        await user.type(dateInput, "2026-01-01");


        const rating = screen.getByRole('spinbutton', {name: /rating:/i});
        await user.type(rating, "5");

        const submit = screen.getByRole('button', {name: /submit/i});

        screen.getByRole('button', {name: /reset/i})

        // Use user.click for more realistic event simulation
        await user.click(submit);

        // waitFor will keep retrying until the mock is called, or it times out
        await waitFor(() => {
            expect(reviewSubmitTest).toHaveBeenCalledWith(expect.objectContaining({
                description: "test",
                rating: 5,
                date: "2026-01-01"
            }));

            screen.logTestingPlaygroundURL();
        });
    });
});
