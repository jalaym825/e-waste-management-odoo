const { Router } = require('express');
const { verifyJWT, validateSchema } = require('../../utils/middleware');
const controller = require('./controller');

const router = Router();

router.post('/orders', verifyJWT, controller.createOrder);
router.post('/success', verifyJWT, controller.paymentSuccess);

module.exports = router;