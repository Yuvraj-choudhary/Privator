import expressAsyncHandler from "express-async-handler";
import {getToken} from "../config/getToken";

const bcrypt = require("bcryptjs");

const User = require("../models/userModels")

const registerUser = expressAsyncHandler(async (req: any, res: any) => {
    const {name, email, password, pic} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const userExits = await User.findOne({email})

    if (userExits) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        return res.status(201).json({
            message: "User created successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: getToken(user._id)
        });
    } else {
        return res.status(400).json({
            message: "User not created"
        });
    }

})


const authUser = expressAsyncHandler(async (req: any, res: any) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
            message: "User authenticated successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: getToken(user._id)
        });
    } else {
        return res.status(400).json({
            message: "User not authenticated"
        });
    }
})

const allUsers = expressAsyncHandler(async (req: any, res: any) => {
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}},
        ]
    } : {}

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.status(200).json(users);
})

module.exports = {registerUser, authUser, allUsers};