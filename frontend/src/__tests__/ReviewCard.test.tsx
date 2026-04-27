import {render, screen} from "@testing-library/react";
import ReviewCard from "../components/ReviewCard.tsx";

describe('review card test', () => {
    it('should display card', () => {
        render(<ReviewCard date={new Date('2024-01-15')} rating={4} description={"test"}/>);
        screen.logTestingPlaygroundURL()
        expect(screen.getByText(`14/0/2024`)).toBeInTheDocument()
        expect(document.querySelector('#starRating')).toBeInTheDocument()
        expect(screen.getByText(`test`)).toBeInTheDocument();
    });
});