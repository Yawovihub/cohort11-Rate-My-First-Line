import SubmitLeader from "../components/SubmitLeader.tsx";
import {render, screen} from "@testing-library/react";

describe('Leader Submission Page', () => {
    it('should display submit new leader heading', () => {
        render(<SubmitLeader/>);
        expect(screen.getByRole('heading', {name: /submit new leader/i})).toBeInTheDocument();
        screen.logTestingPlaygroundURL();
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /first name/i})).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /last name/i})).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /job title/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reset/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i})).toBeInTheDocument();
    })
})