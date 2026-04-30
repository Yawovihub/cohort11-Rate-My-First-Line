import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import ReviewForm from "../components/ReviewForm.tsx";
import type {Review} from "../utilities/ReviewTypes.ts";
import * as apiService from "../utilities/APIService.ts";
import {userEvent} from "@testing-library/user-event";
import type {Leader} from "../utilities/LeaderType.ts";
import selectEvent from "react-select-event";

vi.mock('../APIService.ts');

describe('Submit Review Form Testing', () => {

    const user = userEvent.setup();

    let date: Date = new Date("2026-01-01");
    const initialReview : Review = {id: 1, leader:{id: 1}, rating: 5, description: "test", date: date
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

        const reviewSubmitTest = vi.spyOn(apiService, 'postReviews').mockResolvedValue(initialReview)

        const getLeadersTest = vi.spyOn(apiService, 'getLeaders').mockResolvedValue(arrayLeaders);

        render(<ReviewForm isOpen={false} onClose={function(): void {
            throw new Error("Function not implemented.");
        } }/>)

        const getLeader = await screen.findByRole('combobox');

        await selectEvent.select(getLeader, `${getLeaders.fname} ${getLeaders.lname} — ${getLeaders.jobTitle}`);

        fireEvent.keyDown(getLeader, {
            key: initialReview.id,
            code: initialReview.id
        });

        const description = await screen.findByRole('textbox', {name: /input/i})

        await user.type(description, "test");
        expect(description).toHaveDisplayValue("test");

        // MM/DD/YYYY format
        // const formattedDate = `${String(initialReview.date.getMonth() + 1).padStart(2, '0')}/${String(initialReview.date.getDate()).padStart(2, '0')}/${initialReview.date.getFullYear()}`

        const date = screen.getByLabelText(/date:/i);

        act(() => {
            fireEvent.change(date, {target: {value: "2026-01-01"}});
        });

        expect(date).toHaveValue("2026-01-01");

        const rating = screen.getByLabelText(/rating:/i);
        await user.type(rating, initialReview.rating.toString());
        expect(rating).toHaveValue(initialReview.rating);


        const submit = screen.getByRole('button', {name: /submit/i});

        screen.logTestingPlaygroundURL();
        fireEvent.click(submit);
        await waitFor(() =>{
            expect(reviewSubmitTest).toHaveBeenCalledOnce()
        });

        // THIS DOES NOT WORK :(
            expect(reviewSubmitTest).toHaveBeenCalledOnce();

        screen.logTestingPlaygroundURL();
    });

});
