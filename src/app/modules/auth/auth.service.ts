import config from "../../config";
import AppError from "../../errors/AappErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
    // console.log(payload.password);

    // check if the user is exists
    const user = await User.isUserExistsByCustomId(payload.id);
    console.log(user);
    // console.log("Plain Password:", payload?.password);
    // console.log("Hashed Password:", user?.password);

    if (!user) {
        throw new AppError(404, "This user is not found")
    }

    // check if the user is deleted 
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(404, "This user is deleted")
    }
    // check if the user is Blocked 
    const userStatus = user?.status;

    if (userStatus === "blocked") {
        throw new AppError(404, "This user is Blocked")
    }

    const result = await User.isPasswordMatched(payload?.password, user?.password)
    console.log(result);

    if (!result) {
        throw new AppError(404, 'Password do not matched');
    }



    // console.log(isPasswordMatched);

    // Create Token And Send To The Client
    // const jwtPayload = {
    //     userId: user,
    //     userRole: user.role
    // }
    // const accessToken = jwt.sign({ jwtPayload }, config.jwt_access_secret as string, { expiresIn: "10d" });
    return {}
    // return {
    //     // accessToken,
    //     // needsPasswordChange: user?.needsPasswordChange
    // }
}


export const AuthServices = {
    loginUser
}