import httpStatus from "http-status";
import { userService } from ".";
import { signToken } from "../middleware/auth";
import { userRepository } from "../repository/index";
import ApiError from "../utils/ApiError";

export default {
    createUser: async (newUser: UserInfo) => {
        return await userRepository.create(newUser);
    },
    getByUserName: async (userName: string) => {
        return await userRepository.getByUserName(userName);
    },
    getById: async (id: string) => {
        return await userRepository.getById(id);
    },
    login: async (userInfo: UserInfo) : Promise<string> => {
        console.log('INSIDEE' , userInfo)
        const user: UserInfo = await userRepository.getByUserInfo(userInfo);
        if (user) {
            let token = signToken(user);
            return token;
        }
        throw new ApiError(httpStatus.UNAUTHORIZED, "User doesn't exists");
    },
    smoke: async (id: string, smoke: Smoke): Promise<void> => {
        await userRepository.addSmokePoint(id, smoke);
    },
    smokingReport: async (id: string) : Promise<SmokingReport>  => {
        const smokeList: Array<Smoke> = await userRepository.getSmoke(id);
        const result: SmokingReport = [];
        smokeList.map((item: Smoke) => {
            const dailyReport: DailyReport = {
                count: 1,
                day: `${item.when.getDate()}-${item.when.getMonth() + 1}-${item.when.getFullYear()}`,
                detail: [{
                    time: {
                        hours: item.when.getHours(),
                        minutes: item.when.getMinutes(),
                        seconds: item.when.getSeconds()
                    },
                    location: item.where
                }]
            }
            const searchResult = result.find((item: DailyReport) => item.day === dailyReport.day)
            if (searchResult) {
                searchResult.count++;
                searchResult.detail.push(dailyReport.detail.shift() as ReportDetail)
                return;
            }
            result.push(dailyReport)
        })
        return result;
    },
    dailyReport: async (id: string) : Promise<DailyReport>  => {
        const today = new Date();
        const smokeList: Array<Smoke> = await userRepository.getSmoke(id, today);
        const result: DailyReport = {
            count: smokeList.length,
            day : `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`,
            detail : smokeList.map((item :Smoke) => ({
                time: {
                    hours: item.when.getHours(),
                    minutes: item.when.getMinutes(),
                    seconds: item.when.getSeconds()
                },
                location: item.where
            }))
        };
        return result;
    }
}