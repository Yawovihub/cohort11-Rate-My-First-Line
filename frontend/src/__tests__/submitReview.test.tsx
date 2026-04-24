import {render, screen, within} from '@testing-library/react';
import SubmitReview from "../components/SubmitReview.tsx";

describe('Submit Review Form Testing', () => {

    it('should display header', () => {

        render(<SubmitReview/>);
        screen.findByRole('heading');

        expect(
            screen.getByRole('heading', {name: /This is a header/i}),
        ).toBeInTheDocument();
    });

});
