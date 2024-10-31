import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from "body-parser";
import dataBaseConnection  from './src/db/dbConnection.js'
import router from './src/routes/userRouter.js';
import adminRouter from './src/routes/adminRouter.js'
import cors from 'cors'

dotenv.config()
dataBaseConnection.connect()
const app = express()

const corsOptions = {
    origin: 'https://leader-board-front-end.vercel.app', // Replace with your React app's domain
    methods: ['GET', 'POST', 'PATCH','PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router)
app.use('/admin',adminRouter)

app.listen(process.env.PORT,()=>{
    console.log('running on the port   '+process.env.PORT);
})