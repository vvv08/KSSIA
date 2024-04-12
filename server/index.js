import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from 'morgan';
const app = express();

import categoriesRoutes from './routes/categories.js';
import companiesRoutes from './routes/companies.js';
import homeRoutes from './routes/home.js';
import productRoutes from './routes/products.js';
import searchRoutes from './routes/search.js';
import miscRoutes from './routes/misc.js';
import authRoutes from './routes/auth.js'

//To unblock requests
 app.use((req,res,next) => {
     res.header("Access-Control-Allow-Credentials", true);
     next();
 })

//Allow data to be sent in json format
app.use(express.json());

//To block requests from unknow URLs
app.use(cors({
    origin:process.env.SOURCE_URL
}));

//To log all requests
app.use(logger('dev'));

//To parse cookies
app.use(cookieParser());


app.use('/api',homeRoutes);
app.use('/api/categories',categoriesRoutes);
app.use('/api/companies',companiesRoutes);
app.use('/api/products',productRoutes);
app.use('/api/searchResults',searchRoutes);
app.use('/api/misc/districts',miscRoutes);
app.use('/api/admin/login',authRoutes);

//Server started in port 3000
app.listen(3000,() => {
    console.log("Server started")
})