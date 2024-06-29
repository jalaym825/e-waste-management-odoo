const { PrismaClient } = require('@prisma/client');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const routes = require('./router');
const http = require('http');
const morgan = require('morgan');
const { errorMiddleware } = require('./utils/middleware');

const prisma = new PrismaClient(); // Initialize prisma client

const app = express();
const server = http.createServer(app);

app.use(morgan("[:date[clf]] :method :url :status :res[content-length] - :response-time ms"));

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  prisma.$connect().then(() => {
    console.log('Connected to database');
  })
  // Import and use routes from a separate file
  routes(app);
  app.use(errorMiddleware);
});

app.get("/", (req, res) => {
  res.json("Server is running!");
})
