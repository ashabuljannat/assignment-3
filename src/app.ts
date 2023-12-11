import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

const start_server = async (req: Request, res: Response) => {
  res.send('hello world');
};
app.get('/', start_server);

app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
