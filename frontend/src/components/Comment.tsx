import React from 'react';
import {type Comment} from "../utilities/CommentType.ts"
import type {ReviewComment} from "../utilities/ReviewCommentType.ts";

type CommentProps = {
    comment : ReviewComment
}

const Comment = ({comment} : CommentProps) => {
    return (
        <div className={"border-3"}>
            <p>{comment.reviewComment}</p>
        </div>
    );
};

export default Comment;