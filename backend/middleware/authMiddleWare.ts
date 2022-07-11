import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const User = require("../models/userModels");

const protect = asyncHandler(async (req: any, res: any, next: any) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // @ts-ignore
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            return res.status(401).json({
                error: "You are not authorized to access this resource"
            });
        }

    }

    if (!token) {
        return res.status(401).json({
            error: "You are not authorized to access this resource"
        });
    }
});

module.exports = {protect};
