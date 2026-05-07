import {describe} from "vitest";
import {render, screen} from "@testing-library/react";
import Comment from "../components/Comment.tsx"
import ThumbsButton from "../components/ThumbsButton.tsx";
import {userEvent} from "@testing-library/user-event";

describe("Review Comment Thumbs up test", ()=>{
    const user=userEvent.setup()

    it('should display thumbs up', () => {
        render(<Comment comment={{
            id: 1,
            reviewComment: "Still Grooting"
        }}/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByRole('button', { name: /👍/i })).toBeInTheDocument()

    });
    it('should display a counter', () => {
        render(<ThumbsButton/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByLabelText('counter')).toHaveTextContent("0")

    });

    it('should update count when clicked', async() => {
        render(<ThumbsButton/>)
        const button = screen.getByRole('button')

       await user.click(button)
        expect(screen.getByLabelText('counter')).toHaveTextContent("1")
        screen.logTestingPlaygroundURL();
    });

})