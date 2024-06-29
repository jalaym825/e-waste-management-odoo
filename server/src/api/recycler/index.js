const { Router } = require('express');
const { verifyJWT, validateSchema } = require('../../utils/middleware');
const controller = require('./controller');

const router = Router();

router.get('/pickups', verifyJWT, controller.getPickups);

module.exports = router;