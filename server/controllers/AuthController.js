import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { renameSync, unlink, unlinkSync } from 'fs'
import path from "path"

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
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color
        },
    });

}

export const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).send("User not found")
        }

        return res.status(200).json({
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })
    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server error")
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;
        if (!firstName || !lastName || color === undefined) {
            return res.status(404).send("Firstname, lastname and color is required")
        }

        const userData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true });

        return res.status(200).json({
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })

    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server error")
    }
}



export const updateProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("File is required")
        }

        const date = Date.now()
        const fileName = path.join("uploads", "profiles", `${date}-${req.file.originalname}`)
        renameSync(req.file.path, fileName)

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { image: fileName },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            image: updatedUser.image,
        })
    } catch (error) {
        console.error({ error })
        return res.status(500).send("Internal Server Error")
    }
}


export const removeProfileImage = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send("User not found")
        }

        if (user.image) {
            unlinkSync(user.image)
        }

        user.image = null;
        await user.save()

        return res.status(200).send("Profile Image Removed Successfully")
    } catch (error) {
        console.error({ error })
        return res.status(500).send("Internal Server Error")
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" })
        return res.status(200).send("Logout Successful")
    } catch (error) {
        console.error({ error })
        return res.status(500).send("Internal Server Error")
    }
}