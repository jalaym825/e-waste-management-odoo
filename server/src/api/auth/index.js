const { Router } = require('express');
// const ratelimit = require('express-rate-limit');
const { isNotVerified, isUser, mailSent, verifyJWT, validateSchema } = require('../../utils/middleware');
const controller = require('./controller');
const { signupSchema, loginSchema, sendVerificationMailSchema } = require('../../validators/zodValidators');

const router = Router();

router.put('/verify/:token', controller.verify);
router.post("/register", validateSchema(signupSchema), controller.register);
router.post('/login', validateSchema(loginSchema), controller.login);
router.get('/me', verifyJWT, controller.getUser);
router.post('/sendVerificationMail', validateSchema(sendVerificationMailSchema), isUser, isNotVerified, mailSent, controller.sendVerificationMail);

module.exports = router;