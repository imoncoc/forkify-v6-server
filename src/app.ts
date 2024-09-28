import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import config from './app/config';
import path from 'path';

const app: Application = express();

// parsers
app.use(express.json());

// applications
// app.use('/api/v1/students');
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://sports-facility-v5.netlify.app'],
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

const getAController = (req: Request, res: Response) => {
  res.send(
    'Hello, Next level Developer!. This project is about sports booking platform',
  );
};
// applications
app.get('/', getAController);
app.use('/api', router);

app.use(globalErrorHandler);

// NOt Found
app.use(notFound);

export default app;
