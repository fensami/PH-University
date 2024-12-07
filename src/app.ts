import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  // Promise.reject()
  const a = 10;
  res.send("server run succesfully , Welcome to Ph University");
};

app.get('/', test);
app.use(globalErrorHandler)

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {

//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Something went wrong"

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     err
//   })

// })

export default app;
