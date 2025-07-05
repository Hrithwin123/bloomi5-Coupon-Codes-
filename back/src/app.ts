import express from 'express';
import couponRouter from './modules/coupons/coupon.routes.js';
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())


app.use('/api/coupons', couponRouter);


export default app;
