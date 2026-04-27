import {render, screen} from '@testing-library/react';
import SubmitReview from "../components/SubmitReview.tsx";

describe('Submit Review Form Testing', () => {

    it('should display header', () => {

        render(<SubmitReview/>);
        screen.findByRole('button');
        screen.findByRole('textbox')

        expect(
            screen.getByRole('button', {name: /submit/i}),
        ).toBeInTheDocument();
    });

});
