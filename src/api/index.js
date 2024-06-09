import express from 'express';
import SongRouter from './resources/song/song.router.js';
import AuthRouter from './resources/auth/auth.router.js';
import UserRouter from './resources/user/user.router.js';
import CarRouter from './resources/car/car.router.js';
import CartrackerRouter from './resources/cartracker/cartracker.router.js';

export const restRouter = express.Router();
restRouter.use('/auth', AuthRouter);
restRouter.use('/songs', SongRouter);
restRouter.use('/users', UserRouter);
restRouter.use('/cars', CarRouter);
restRouter.use('/cartracker', CartrackerRouter);
