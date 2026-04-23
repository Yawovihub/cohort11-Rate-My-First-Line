import React, { useState, FormEvent, useEffect } from 'react';

type Leader = {
    id: number;
    fname: string;
    lname: string;
    jobTitle: string;
};

const SubmitReview: React.FC = () => {
    const [selectedLeaderId, setSelectedLeaderId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await fetch('/api/v1/leader');
                const data: Leader[] = await response.json();
                setLeaders(data);                           // was setName(data) — wrong state
            } catch (error) {
                console.error('Failed to get leaders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    const handleReset = (): void => {
        setSelectedLeaderId('');
        setDescription('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="formSubmit">
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

                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Rating:</label>

                <button type="reset" onClick={handleReset}>Reset</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitReview;