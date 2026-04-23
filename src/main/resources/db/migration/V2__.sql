CREATE SEQUENCE IF NOT EXISTS leader_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS review_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE IF NOT EXISTS leader
(
    id        BIGINT NOT NULL,
    fname     VARCHAR(255),
    lname     VARCHAR(255),
    job_title VARCHAR(255),
    CONSTRAINT pk_leader PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS review
(
    id          BIGINT           NOT NULL,
    leader_id   BIGINT           NOT NULL,
    rating      DOUBLE PRECISION NOT NULL,
    description VARCHAR(255),
    date        date,
    CONSTRAINT pk_review PRIMARY KEY (id)
);

ALTER TABLE review
    ADD CONSTRAINT fk_review_on_leaderid
        FOREIGN KEY (leader_id) REFERENCES leader (id)