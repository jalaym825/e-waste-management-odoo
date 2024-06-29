const { Router } = require('express');
const { verifyJWT, validateSchema } = require('../../utils/middleware');
const controller = require('./controller');
const { schedulePickupSchema } = require('../../validators/zodValidators');

const router = Router();

router.post('/schedule-pickup', verifyJWT, validateSchema(schedulePickupSchema), controller.schedulePickup);
router.get('/pickups', verifyJWT, controller.getPickups);

module.exports = router;