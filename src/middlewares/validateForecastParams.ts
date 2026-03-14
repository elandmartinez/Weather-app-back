import { NextFunction, Request, Response } from "express";

export const validateForecastParams = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validating forecast parameters");
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ message: "Location query param is required" });
    }
    next();
}