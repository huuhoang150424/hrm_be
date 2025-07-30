import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import body_parser from 'body-parser';
import morgan from 'morgan';
import { connectDatabase } from 'models/connect';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(morgan('dev'));
connectDatabase();

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
