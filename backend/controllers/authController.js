import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "dummy_client_id");

// user registration with OTP
export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            otp,
            otpExpires,
            isVerified: true
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully created. You can now log in.",
            userId: newUser._id
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to create. Try Again!"
        });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP!" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Email successfully verified!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to verify OTP." });
    }
};

// user login
export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
           return res.status(404).json({ success: false, message: "User not found!" });
        }

        if (user.password) {
            const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
            if (!checkCorrectPassword) {
                return res.status(401).json({ success: false, message: "Incorrect Email or Password!" });
            }
        } else {
            return res.status(401).json({ success: false, message: "Please login with Social Auth." });
        }

        if (!user.isVerified && !user.googleId && !user.facebookId) {
             return res.status(403).json({ success: false, message: "Please verify your email first!" });
        }

        const { password, role, ...rest } = user._doc;

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY || "fallback_secret",
            { expiresIn: "15d" }
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }).status(200).json({ token, data: { ...rest }, role });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to Login!" });
    }
};

// Google Auth
export const googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body;
        // Verify with Google (Stubbed for testing without real client ID)
        // const ticket = await client.verifyIdToken({
        //     idToken: tokenId,
        //     audience: process.env.GOOGLE_CLIENT_ID
        // });
        // const { email_verified, email, name, picture, sub } = ticket.getPayload();
        
        // Mock payload for testing if tokenId is provided directly as email for test
        const email = req.body.email || "googleuser@test.com";
        const name = req.body.name || "Google User";
        const picture = req.body.picture || "";
        const sub = tokenId || "google_sub_id";

        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = sub;
                user.isVerified = true;
                await user.save();
            }
        } else {
            user = new User({
                username: name,
                email: email,
                photo: picture,
                googleId: sub,
                isVerified: true
            });
            await user.save();
        }

        const { password, role, ...rest } = user._doc;
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY || "fallback_secret",
            { expiresIn: "15d" }
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }).status(200).json({ token, data: { ...rest }, role });

    } catch (err) {
        res.status(500).json({ success: false, message: "Google authentication failed" });
    }
};

// Facebook Auth
export const facebookAuth = async (req, res) => {
    try {
        const { userID, accessToken, email, name, picture } = req.body;
        
        let user = await User.findOne({ email });

        if (user) {
            if (!user.facebookId) {
                user.facebookId = userID;
                user.isVerified = true;
                await user.save();
            }
        } else {
            user = new User({
                username: name,
                email: email,
                photo: picture?.data?.url || "",
                facebookId: userID,
                isVerified: true
            });
            await user.save();
        }

        const { password, role, ...rest } = user._doc;
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY || "fallback_secret",
            { expiresIn: "15d" }
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }).status(200).json({ token, data: { ...rest }, role });

    } catch (err) {
        res.status(500).json({ success: false, message: "Facebook authentication failed" });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to: \n\n ${resetUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token',
            message
        });

        res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to send reset email" });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to reset password" });
    }
};