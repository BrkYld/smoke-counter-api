import config from '../config/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';


interface DecodedPayload extends jwt.JwtPayload {
    user: UserInfo
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, config.jwtSecret, (err: unknown, authData: unknown) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                next();
            }
        });

    }
    else {
        res.sendStatus(401);
    }
}

const currentUser = async (req: Request) : Promise<UserInfo> => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = await jwt.verify(bearerToken, config.jwtSecret) as DecodedPayload;
        return decoded.user;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occured when get user')
}

const signToken = (user: UserInfo): string => {
    let token = jwt.sign({ user }, config.jwtSecret, {
        expiresIn: "1d",
    });

    return token;
}

export { currentUser, verifyToken, signToken }