import axios from "axios";
import type {Leader} from './LeaderType.ts'

const client = axios.create();

export const getLeaders = async (): Promise<Leader[]> =>{
    return await client.get<Leader[]>(("api/v1/leader/all")).then(r => r.data);
}