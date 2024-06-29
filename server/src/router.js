const authRouter = require('./api/auth/index');
const userRouter = require('./api/user/index');
const recyclerRouter = require('./api/recycler/index');
const razorpayRouter = require('./api/razorpay/index');
// const userRoutes = require('./api/user/index');
// const forgotpassword = require('./api/forgotpassword/index');
// const ticketRouter = require('./api/ticket/index');
// const testRouter = require('./api/test/index');
// const swaggerUi = require('swagger-ui-express');

// const swaggerDocument  = require('../swagger-output.json');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter)
    app.use('/recycler', recyclerRouter)
    app.use('/razorpay', require('./api/razorpay/index'))
}

module.exports = routes;