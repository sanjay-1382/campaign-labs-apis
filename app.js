import createError from 'http-errors';
import express, { json, urlencoded, static as _static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import errorHandler from './src/utils/response/error-handler';
import indexRouter from './src/routes/index';
import './src/configs/db-connection';
import cors from "cors";
const app = express();

// cors origin
const corsOptions = { origin: '*', methods: '*', credentials: true };
app.use(cors({ origin: "*" }));

// Middleware setup
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(_static(join(__dirname, 'public')));
app.use(errorHandler);

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);

// 404 handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
});

export default app;