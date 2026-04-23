import {vi} from "vitest";
import * as client from '../utilities/APIService.ts'
import {type Leader} from '../utilities/LeaderType.ts'
import type {AxiosResponse} from "axios";


type Response={ status: number}

vi.mock("../utilities/APIService.ts");
const postSpy = vi.spyOn(client, "postLeaders")
const spy = vi.spyOn(client, "getLeaders")
describe('Leader Service', () => {
    let leaderOne : Leader
    let leaders : Leader[]
    let response: Response

    beforeEach(() =>{
        leaderOne = {
            id: 1,
            fname: "George",
            lname: "Of the Jungle",
            jobTitle: "Battalion Commander"
        }
        response={
            status: 200,
        }
        leaders = [leaderOne]
        vi.mocked(client.getLeaders).mockResolvedValue(leaders);
        vi.mocked(client.postLeaders).mockResolvedValue(response)
    })
    it('should get all leaders', async () => {
        //Arrange
        const foundLeaders : Leader[] = await client.getLeaders();
        expect(foundLeaders[0].jobTitle).toStrictEqual(leaders[0].jobTitle)
        expect(spy).toHaveBeenCalledOnce()
    });


    it('should post a leader', async () => {
       //  const foundLeader = await client.postLeaders();
       // expect(Response).toBe()

    });
});