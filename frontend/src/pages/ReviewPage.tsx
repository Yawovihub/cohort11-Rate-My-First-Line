import { useState } from 'react';
import ReviewForm from '../components/ReviewForm.tsx';
import ViewReviews from "./ViewReviews.tsx";

export const ReviewPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);


    // Grabbed this from to-do app/Gemini, we need to separate concerns here so that our App.jsx stays clean (see to-do TaskPage.tsx)
    return(
        <>
            <h1>This is the Review Page</h1>

            <button onClick={() => setIsFormOpen(true)}>
                {/*Leave a Review*/}
            </button>

            <ReviewForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />

            <h2 className={'bold'}> Review Box/Card Here?</h2>
            <ul id={'list'}>
                <li>No Reviews</li>
            </ul>
            <ViewReviews></ViewReviews>
        </>
    )
}