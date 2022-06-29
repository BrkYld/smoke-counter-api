import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status"
import { currentUser } from "../middleware/auth";
import { userService } from "../service/index";
import ApiResponse from "../utils/ApiResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).send(new ApiResponse(user));
    } catch (error) {
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserInfo  = await currentUser(req)
        res.status(httpStatus.OK).send(new ApiResponse(await userService.getById(user.id)));
    } catch (error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo : UserInfo = req.body 
        const token = await userService.login(userInfo);
        res.status(httpStatus.OK).send(new ApiResponse(token));
    } catch (error) {
        next(error);
    }
}

const smoke = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserInfo  = await currentUser(req);
        const smoke : Smoke = {
            when: new Date(),
            where : req.body,
        };
        res.status(httpStatus.OK).send(new ApiResponse(await userService.smoke(user.id, smoke)));
    } catch (error) {
        next(error);
    }
}

const smokingReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserInfo  = await currentUser(req);
        res.status(httpStatus.OK).send(new ApiResponse(await userService.smokingReport(user.id)));
    } catch (error) {
        next(error);
    }
}
const dailyReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserInfo  = await currentUser(req);
        res.status(httpStatus.OK).send(new ApiResponse(await userService.dailyReport(user.id)));
    } catch (error) {
        next(error);
    }
}
export default { createUser, getUser, login, smoke, smokingReport, dailyReport };