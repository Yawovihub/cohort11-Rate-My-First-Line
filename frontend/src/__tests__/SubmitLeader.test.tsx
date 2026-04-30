import SubmitLeader from "../components/SubmitLeader.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {expect, describe, it} from "vitest";
import * as leaderApi from '../utilities/APIService.ts';
import type {Leader} from "../utilities/LeaderType.ts";
import {userEvent} from "@testing-library/user-event";

vi.mock('../APIService.ts');
describe('Leader Submission Page', () => {
    const initialLeader: Leader = {id: 1,
        fname: 'John', lname: 'Doe', jobTitle: 'teacher'};
    const user = userEvent.setup();

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
    it('should be able to type into fields and click submit', async () => {
       const mockedLeader: Leader = vi.spyOn(leaderApi, 'postLeaders' ).mockResolvedValue(initialLeader);
        render(<SubmitLeader/>)

        const fname = screen.getByRole('textbox', {name: /First Name/i});
        const lname = screen.getByRole('textbox', {name: /Last Name/i});
        const jobTitle = screen.getByRole('textbox', {name: /Job Title/i});
       const submit= screen.getByRole('button', {name: /Submit/i})

        await user.type(fname, 'John');
        expect(fname).toHaveValue('John');

        await user.type(lname, 'Doe');
        expect(lname).toHaveValue('Doe')

        await user.type(jobTitle, 'teacher');
        expect(jobTitle).toHaveValue('teacher')

        await user.click(submit);

            expect(mockedLeader).toHaveBeenCalledTimes(1);


    });
})