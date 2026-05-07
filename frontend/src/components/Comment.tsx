import React from 'react';
import type {ReviewComment} from "../utilities/ReviewCommentType.ts";
import ThumbsButton from "./ThumbsButton.tsx";

type CommentProps = {
    comment : ReviewComment
}

const Comment = ({comment} : CommentProps) => {
    return (
        <div className={"border-3"}>
            <p>{comment.reviewComment}</p>
            <ThumbsButton/>
        </div>
    );
};

export default Comment;