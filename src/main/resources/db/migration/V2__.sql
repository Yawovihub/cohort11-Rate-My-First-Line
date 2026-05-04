CREATE SEQUENCE IF NOT EXISTS review_comment_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE review_comment
(
    id             BIGINT NOT NULL,
    review_id      BIGINT NOT NULL,
    review_comment TEXT,
    CONSTRAINT pk_reviewcomment PRIMARY KEY (id)
);

ALTER TABLE review_comment
    ADD CONSTRAINT FK_REVIEWCOMMENT_ON_REVIEW FOREIGN KEY (review_id) REFERENCES review (id);