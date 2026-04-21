CREATE SEQUENCE IF NOT EXISTS review_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE review
(
    id          BIGINT           NOT NULL,
    leader_id   BIGINT,
    rating      DOUBLE PRECISION NOT NULL,
    description VARCHAR(255),
    date        date,
    CONSTRAINT pk_review PRIMARY KEY (id)
);