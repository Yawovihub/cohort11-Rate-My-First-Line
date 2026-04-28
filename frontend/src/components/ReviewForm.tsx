import {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import type {Leader} from '../utilities/LeaderType';
import {getLeaders, postReviews} from '../utilities/APIService.ts';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import type {InferType} from "yup";
import type {ReviewPost} from "../utilities/ReviewTypes.ts";

const validationSchema = Yup.object({
    leaderId: Yup.number().required("Please select a leader"),
    rating: Yup.number().min(1).max(10).required("Rating is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date required")
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
    } = useForm<formData>({
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

    const onSubmit = async (dataFromForm: formData) => {
        const parsedData : formData = await validationSchema.validate(dataFromForm);
        console.log("Parsed Data", parsedData);

        const payload : ReviewPost = {
            rating : parsedData.rating,
            description: parsedData.description,

            // Extract the local year, month, and day into a YYYY-MM-DD string
            date: `${parsedData.date.getFullYear()}-${String(parsedData.date.getMonth() + 1).padStart(2, '0')}-${String(parsedData.date.getDate()).padStart(2, '0')}`,

            leader:{
                id: parsedData.leaderId
            }
        }

        console.log("Converted Data", payload);
        await postReviews(payload);
        reset();
        onSuccess?.();
        onClose?.();
    }

    return (
        <div>
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

                <div className={"flex justify-center gap-3"}>
                    <button type="reset">Reset</button>
                    <button
                        type="submit"
                        aria-label="submit"
                        className="submitButton"
                    >Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ReviewForm;
