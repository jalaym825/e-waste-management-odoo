const authRouter = require('./api/auth/index');
// const matchRouter = require('./api/match/index');
// const teamRouter = require('./api/team/index');
// const playerRouter = require('./api/player/index');
// const userRoutes = require('./api/user/index');
// const forgotpassword = require('./api/forgotpassword/index');
// const ticketRouter = require('./api/ticket/index');
// const testRouter = require('./api/test/index');
// const swaggerUi = require('swagger-ui-express');

// const swaggerDocument  = require('../swagger-output.json');

function routes(app) {
    app.use('/auth', authRouter);
    // app.use('/matches', matchRouter);
    // app.use('/teams', teamRouter);
    // app.use('/players', playerRouter);
    // app.use('/users', userRoutes);
    // app.use('/forgotpassword',forgotpassword);
    // app.use('/tickets', ticketRouter);
    // app.use('/test', testRouter);
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

module.exports = routes;