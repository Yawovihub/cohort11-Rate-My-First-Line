export type Review = {
    id?: number; // a new review may not have an id unless the backend creates it.
    leader : {
        id: number
    };
    rating: number;
    description: string;
    date?: Date;
}