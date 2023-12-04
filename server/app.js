import express from 'express';
import connect from './schemas/index.js';
import todoListRouter from './routes/todoList.js';
import cors from 'cors';
import { createLogger, format, transports } from 'winston';

const app = express();
const port = 8080;
const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

connect();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.use('/', todoListRouter);

app.use((error, req, res, next) => {
  logger.error(error);
  console.error(error);
  return res
    .status(error.code || 500)
    .json({ message: error.message || '서버 에러.' });
});

app.listen(port, () => {
  logger.info(`${port} 포트로 서버가 열렸어요!`);
});
