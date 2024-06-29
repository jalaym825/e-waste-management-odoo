const jwt = require('jsonwebtoken');
const logger = require("./logger");
const prisma = require('./prisma');
const { isValidEmail } = require("./heplers");
const { merge } = require('lodash');

const validateSchema = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    }
    catch (err) {
        next({ path: `${req.originalUrl}/middleware/validate`, status: 422, message: err.errors[0].message, extraData: err.errors })
    }
}

const errorMiddleware = (err, req, res, next) => {
    let error = {
        message: err.message || 'Something went wrong',
    };
    if (err.extraData) {
        error = merge(error, { extraData: err.extraData });
    }

    console.error(err);
    res.status(err.status).send(error);
}


const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];
    if (!token) {
        logger.warn(`[/middleware/verifyJWT] - token missing`);
        logger.debug(`[/middleware/verifyJWT] - token: ${token}`);
        return res.status(401).json({
            error: 'No token provided.'
        });
    }
    try {
        const payload = await jwt.verify(token.toString(), process.env.JWT_SECRET);
        const user = await prisma.users.findUnique({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            logger.warn(`[/middleware/verifyJWT] - user not found`);
            return res.status(401).json({
                error: 'Invalid access token.'
            });
        }
        logger.info(`[/middleware/verifyJWT] - user: ${user?.id} authenticated`);
        req.user = user;
        next();
    } catch (error) {
        logger.error(`[/middleware/verifyJWT] - ${error.message}`);
        return res.status(500).json({
            error: 'Failed to authenticate token.'
        });
    }
}

const isSportsHead = async (req, res, next) => {
    try {
        logger.debug(`[/middleware/isSportsHead] - user: ${req.user.id}, role: ${req.user.roles}`);
        if (!req.user.roles.includes('SPORTS_HEAD')) {
            logger.warn(`[/middleware/isSportsHead] - unauthorized access by user: ${req.user.id}`);
            return res.status(401).json({
                error: 'Unauthorized access.'
            });
        }
        logger.info(`[/middleware/isSportsHead] - user: ${req.user.id} authorized`);
        next();
    } catch (error) {
        logger.error(`[/middleware/isSportsHead] - ${error.message}`);
        return res.status(500).json({
            error: 'Failed to authenticate token.'
        });
    }
}

const isUser = async (req, res, next) => {
    try {
        const { emailOrId } = req.body;
        let user = await prisma.users.findUnique({
            where: {
                email: emailOrId.toLowerCase(),
            },
        });
        user = user || await prisma.users.findUnique({
            where: {
                id: emailOrId.toLowerCase(),
            },
        });
        if (!user) {
            logger.warn(`[/middleware/isUser] - user not found`);
            logger.debug(`[/middleware/isUser] - emailOrId: ${emailOrId}`);
            return res.status(400).json({
                error: "User not found",
            });
        }
        logger.info(`[/middleware/isUser] - user: ${user.id} found`);
        req.user = user;
        next();
    } catch (error) {
        logger.error(`[/middleware/isUser] - ${error.message}`);
        next({status: 400, message: error.message, extraData: error})
    }
}

const isNotVerified = async (req, res, next) => {
    try {
        logger.debug(`[/middleware/iseNotVerified] - user: ${req.user.id}.`);
        if (req.user.isVerified === true) {
            logger.warn(`[/middleware/iseNotVerified] - user: ${req.user.id} is already verified`);
            return res.status(400).json({
                error: 'User is already verified.'
            });
        }
        logger.info(`[/middleware/iseNotVerified] - user: ${req.user.id} is not verified`);
        next();
    } catch (error) {
        logger.error(`[/middleware/iseNotVerified] - ${error.message}`);
        next({ status: 500, message: error.message, extraData: error })
    }
}

const mailSent = async (req, res, next) => {
    try {
        let tokenData = await prisma.verificationTokens.findUnique({
            where: {
                userId: req.user.id,
            },
        });
        if (tokenData && tokenData.expiresAt > new Date()) {
            logger.warn(`[/middleWare/mailSent] - verification mail already sent`);
            logger.debug(`[/middleWare/mailSent] - email: ${req.user.email}`);
            const leftTime = new Date(Number(tokenData.expiresAt) - Date.now());
            return res.status(400).json({
                leftTime,
                error: `Verification mail already sent, you can resend it after ${leftTime.getMinutes() != 0 ? `${leftTime.getMinutes()}:${leftTime.getSeconds()} minutes` : `${leftTime.getSeconds()} seconds`}`,
            })
        }
        next();
    } catch (error) {
        logger.error(`[/middleware/mailSent] - ${error.message}`);
        next({ status: 500, message: error.message, extraData: error })
    }
}

module.exports = {
    verifyJWT,
    isSportsHead,
    isUser,
    isNotVerified,
    mailSent,
    validateSchema,
    errorMiddleware
}