import StarRatingItem from "./StarRatingItem.tsx";
import type {Review, ReviewCommentPost} from "../utilities/ReviewTypes.ts";
import {type ReviewComment} from "../utilities/ReviewCommentType.ts"
import Comment from "../components/Comment.tsx"
import {useEffect, useState} from "react";
import * as APIService from "../utilities/APIService.ts"
import * as Yup from "yup";
import {type FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type ModalProps = {
    review : Review
    modalState : boolean,
    handleModal : (bool : boolean) => void
}


const ReviewModal = ({review, modalState, handleModal} : ModalProps) => {

    const commentSchema = Yup.object({
        comment: Yup.string().min(10, "comment should be longer than 10 characters.")
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm ({
        mode: "onBlur",
        resolver: yupResolver(commentSchema)
    })
    const date = review.date;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    const [commentsWhatever, setComments] = useState<ReviewComment[] | undefined>(undefined);

    const fetchComments = async () =>{
        if (!review) return;
        const comments = await APIService.getReviewComments(review.id);
        console.log("Why??", comments);
        setComments(comments);
    }

    useEffect(()=>{
            fetchComments();
    },[review])

    const submit = async (e :FieldValues) => {
        const parseData = await commentSchema.validate(e)
        const review_Comment: ReviewCommentPost = {

                review_id: review.id,
                reviewComment: parseData.comment

        }
        await APIService.postReviewComment(review_Comment, review.id)
        await fetchComments()
        reset()
    }

    return (
        <div hidden={!modalState} onClick={() => handleModal(false)} className={`fixed flex flex-row w-screen h-screen justify-center inset-0 items-center ${modalState ? `z-50` : `-z-1`}`}>
            <div onClick={e => e.stopPropagation()} className={`gap-2 group select-none w-1/2 min-h-1/3 max-h-fit flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl ${modalState && `z-10`}`}>
                <div className={"flex flex-col w-full h-3/5 justify-between grow"}>
                    <div className={"flex-col border-b-1 grow mb-2"}>
                        <div className={"flex flex-col"}>
                            <div id="starRating" className="flex items-center justify-center space-x-1">
                                <StarRatingItem rating={review.rating} height={"50"} width={"45"}/>
                            </div>
                            <div className={"flex flex-col w-full items-center md:items-start"}>
                                <p className={"text-3xl text-left"}>{review.description}</p>
                            </div>
                        </div>
                        <p className={"text-2xl"}>{formatted}</p>
                    </div>
                    <form className={"flex flex-col w-full h-2/5 gap-2"} onSubmit={handleSubmit(e => submit(e))}>
                        <textarea className={"w-full h-2/3 align-text-top p-1 border rounded"} placeholder={"Leave a comment..."}{...register("comment")}/>
                        <button type={"submit"} className={ "p-2 border-1 rounded w-1/2 self-center hover:cursor-pointer hover:bg-gray-400 hover:text-black"}>Submit</button>
                    </form>
                    {commentsWhatever && commentsWhatever.map(comment => <Comment comment={comment} key={comment.id}/> )}
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;