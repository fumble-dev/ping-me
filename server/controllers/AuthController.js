import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const maxAge = 3 * 24 * 60 * 60 * 1000; // for cookies (ms)
const jwtExpiry = 3 * 24 * 60 * 60; // for JWT (seconds)

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: jwtExpiry });
};

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        const user = await User.create({ email, password });

        res.cookie("jwt", createToken(email, user._id), {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: maxAge,
        });

        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and Password are required")
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("Invalid Credentials")
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        return res.status(400).send("Invalid Credentials")
    }

    res.cookie("jwt", createToken(email, user._id), {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: maxAge,
    });

    return res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            color:user.color
        },
    });

}