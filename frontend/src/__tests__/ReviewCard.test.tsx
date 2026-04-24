import {render, screen} from "@testing-library/react";
import ReviewCard from "../components/ReviewCard.tsx";

describe('review card test', () => {
    it('should display card', () => {
        render(<ReviewCard />);
        screen.logTestingPlaygroundURL()
        expect(screen.getByText(/date/i)).toBeInTheDocument()
        expect(document.querySelector('#starRating')).toBeInTheDocument()
        expect(screen.getByText(/rating/i)).toBeInTheDocument();
        expect(screen.getByText(/description/i)).toBeInTheDocument();
    });
});