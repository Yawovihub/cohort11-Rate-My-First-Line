import {vi} from "vitest";
import * as client from '../utilities/APIService.ts'
import {type Leader} from '../utilities/LeaderType.ts'

vi.mock("../utilities/APIService.ts");
describe('Leader Service', () => {
    let leaderOne : Leader
    let leaders : Leader[]
    beforeEach(() =>{
        leaderOne = {
            id: 1,
            fname: "George",
            lname: "Of the Jungle",
            jobTitle: "Battalion Commander"
        }
        leaders = [leaderOne]
        vi.mocked(client.getLeaders).mockResolvedValue(leaders);
    })
    it('should get all leaders', async () => {
        //Arrange
        const foundLeaders : Leader[] = await client.getLeaders();
        expect(foundLeaders).toStrictEqual(leaders)
    });
});