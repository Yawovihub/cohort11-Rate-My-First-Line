import React, { useState, FormEvent, useEffect } from 'react';
import type {Leader} from '../utilities/LeaderType';
import {getLeaders, postLeaders, postReviews} from '../utilities/APIService.ts';


const SubmitReview: React.FC = () => {
    const [selectedLeaderId, setSelectedLeaderId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState<boolean>(true);




    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await getLeaders();
                setLeaders(response);
            } catch (error) {
                console.error('Failed to get leaders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    const onSubmit = async (leaders: Leader) => {
        await postLeaders(leaders);
        handleReset();
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    const handleReset = (): void => {
        setSelectedLeaderId('');
        setDescription('');
    };

    return (
        <div>

            <h1>Submit a Review</h1>

            <form  className="formSubmit">
                <label>Name</label>
                {loading ? (
                    <p>Loading leaders...</p>
                ) : (
                    <select
                        value={selectedLeaderId}
                        onChange={(e) => setSelectedLeaderId(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                <label>Rating:</label>
                <p>Rating to do later</p>

                <div>
                <button type="reset" onClick={handleReset}>Reset</button>
                </div>
                <button
                    type="submit"
                    aria-label="button"
                    className="submitButton"
                >Submit</button>

            </form>
        </div>
    );
};

export default SubmitReview;