import { Request, Response } from "express";
// import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {


    return res.status(404).json({
        success: false,
        message,
    })
}
export default notFound