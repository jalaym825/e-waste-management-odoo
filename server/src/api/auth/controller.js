const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Request, Response } = require("express");
const jwt = require('jsonwebtoken');
const { isValidEmail } = require("../../utils/heplers");
const logger = require("../../utils/logger");
const nodemailer = require("../../utils/mailer");
const prisma = require('../../utils/prisma');
const mailer = require("../../utils/mailer");

const register = async (req, res, next) => {
    try {
        const { email, password, phoneNumber, name, city, country, state, zipCode, type } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (user) {
            logger.warn(`[/auth/register] - email already exists`);
            logger.debug(`[/auth/register] - email: ${email}`);
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.users.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                phoneNumber,
                city,
                country,
                state,
                zipCode,
                type: type ? type.toUpperCase() : "INDIVIDUALS",
            },
        });

        // If the user is a recycler, create a corresponding Recycler record
        if (newUser.type === "RECYCLERS") {
            await prisma.recycler.create({
                data: {
                    userId: newUser.sys_id,
                },
            });
        }

        logger.info(`[/auth/register] - success - ${newUser.sys_id}`);
        logger.debug(`[/auth/register] - email: ${email}`);

        // send verification email with link
        const token = crypto.randomBytes(20).toString("hex");
        const verificationToken = await prisma.verificationTokens.create({
            data: {
                userSysId: newUser.sys_id,
                token,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            },
        });
        const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken.token}`;
        await mailer.sendVerificationLink(newUser.email, verificationLink);

        delete newUser.password;
        delete newUser.sys_id;

        return res.status(200).json({
            user: newUser,
            message: "User created successfully",
        });
    } catch (err) {
        logger.error(`[/auth/register] - ${err.message}`);
        next({ path: '/auth/register', status: 400, message: err.message, extraData: err });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await prisma.users.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!user) {
            logger.warn(`[/auth/login] - email not found`);
            logger.debug(`[/auth/login] - email: ${email}`);
            return res.status(400).json({
                message: "email not found",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.warn(`[/auth/login] - invalid password`);
            logger.debug(`[/auth/login] - email: ${email}`);
            return res.status(400).json({
                message: "Invalid password",
            });
        }
        const token = jwt.sign({ id: user.sys_id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        logger.info(`[/auth/login] - success - ${user.sys_id}`);
        logger.debug(`[/auth/login] - email: ${email}`);

        delete user.password;
        delete user.sys_id;

        return res.status(200).json({
            token,
            user,
        });
    } catch (err) {
        logger.error(`[/auth/login] - ${err.message}`);
        next({ path: '/auth/login', status: 400, message: err.message, extraData: err });
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        logger.info(`[/auth/getUser] - success - ${user.sys_id}`);
        logger.debug(`[/auth/getUser] - id: ${user.sys_id}`);
        delete user.password;
        delete user.sys_id;
        return res.status(200).json({
            user,
        });
    } catch (err) {
        logger.error(`[/auth/getUser] - ${err.message}`);
        next({ path: '/auth/getUser', status: 400, message: err.message, extraData: err });
    }
}

const verify = async (req, res, next) => {
    try {
        const { token } = req.params;
        const verificationToken = await prisma.verificationTokens.findFirst({
            where: {
                token,
            },
        });
        if (!verificationToken) {
            logger.warn(`[/auth/verify] - token not found`);
            logger.debug(`[/auth/verify] - token: ${token}`);
            return res.status(400).json({
                message: "Invalid token",
            });
        }
        if (verificationToken.expiration < new Date()) {
            logger.warn(`[/auth/verify] - token expired`);
            logger.debug(`[/auth/verify] - token: ${token}`);
            return res.status(400).json({
                message: "Token expired",
            });
        }
        const user = await prisma.users.update({
            where: {
                sys_id: verificationToken.userSysId,
            },
            data: {
                isVerified: true,
            },
        });
        // delete verification token
        await prisma.verificationTokens.delete({
            where: {
                token,
            },
        });
        logger.info(`[/auth/verify] - success - ${user.sys_id}`);
        logger.debug(`[/auth/verify] - id: ${user.sys_id}`);
        return res.status(200).json({
            message: "Email verified successfully",
        });
    } catch (err) {
        logger.error(`[/auth/verify] - ${err.message}`);
        next({ path: '/auth/verify', status: 400, message: err.message, extraData: err });
    }
}

const sendVerificationMail = async (req, res, next) => {
    try {
        const user = req.user;
        const secretToken = crypto.randomBytes(20).toString("hex");
        const tokenData = await prisma.verificationTokens.upsert({
            where: {
                userId: req.user.sys_id,
            },
            update: {
                userId: req.user.sys_id,
                token: secretToken,
                expiresAt: new Date(Date.now() + 60 * 1000 * 60), // 1 hour
            },
            create: {
                userId: req.user.sys_id,
                token: secretToken,
                expiresAt: new Date(Date.now() + 60 * 1000 * 60), // 1 hour
            },
        });

        const verificationLink = `http://locahlhost:3000/verify/${tokenData.token}`;
        await mailer.sendVerificationLink(user.email, verificationLink);
        logger.info(`[/auth/sendVerificationMail] - success - ${user.sys_id}`);
        logger.debug(`[/auth/sendVerificationMail] - id: ${user.sys_id}`);
        return res.status(200).json({
            message: "Verification email sent successfully",
        });
    } catch (err) {
        logger.error(`[/auth/sendVerificationMail] - ${err.message}`);
        next({ path: '/auth/sendVerificationMail', status: 400, message: err.message, extraData: err });
    }
}

module.exports = {
    register,
    login,
    getUser,
    verify,
    sendVerificationMail
}