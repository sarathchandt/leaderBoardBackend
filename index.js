import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from "body-parser";
import dataBaseConnection  from './src/db/dbConnection.js'
import router from './src/routes/userRouter.js';


dotenv.config()
dataBaseConnection.connect()
const app = express()

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router)


app.listen(process.env.PORT,()=>{
    console.log('running on the port '+process.env.PORT);


})