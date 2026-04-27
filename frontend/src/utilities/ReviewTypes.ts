export type Review = {
    id: number;
    leaderId? : number;
    rating: number;
    description: string;
    date?: Date;
}