import {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import type {Leader} from '../utilities/LeaderType';
import {getLeaders, postReviews} from '../utilities/APIService.ts';
import type {Review} from "../utilities/ReviewTypes.ts";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/src";
import type {InferType} from "yup";

const validationSchema = Yup.object({
    leaderId: Yup.number().required("Please select a leader"),
    rating: Yup.number().min(1).max(10).required("Rating is required"),
    description: Yup.string().required("Description is required"),
});
type formData = InferType<typeof validationSchema>

type ReviewFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ReviewForm = ({isOpen, onClose, onSuccess}: ReviewFormProps) => {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm<Review>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);


    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await getLeaders();
                setLeaders(response);
            } catch (error) {
                console.error('Failed to get leaders:', errors);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    const onSubmit = async (review: Review) => {
        const parsedData : formData = await validationSchema.validate(review);
        console.log(parsedData);
        await postReviews(review);
        reset();
        onSuccess?.();
        onClose();
    }

    return (
        <div>

            <h1>Submit a Review</h1>

            <form onSubmit={handleSubmit(e => onSubmit(e))} method={"POST"} className="formSubmit">
                <label>Name</label>
                {loading ? (
                    <p>Loading leaders...</p>
                ) : (
                    <select
                        {...register("leaderId")}
                    >
                        <option value="">Select a leader</option>
                        {leaders.map((leader) => (
                            <option key={leader.id} value={leader.id}>
                                {leader.fname} {leader.lname} — {leader.jobTitle}
                            </option>
                        ))}
                    </select>
                )}
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        aria-label="input"
                        id="textbox"
                        {...register("description")}
                    />
                </div>

                <label>Date:</label>
                <input type={"date"} {...register("date")} />


                <label>Rating:</label>
                <input type={"number"} {...register("rating", { valueAsNumber: true })} />

                <div>
                    <button type="reset">Reset</button>
                </div>
                <button
                    type="submit"
                    aria-label="button"
                    className="submitButton"
                >Submit
                </button>

            </form>
        </div>
    );
};

export default ReviewForm;
