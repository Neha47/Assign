import {app} from './app.js'
import dotenv from 'dotenv';
import { dbConnection } from './db/index.js';

dotenv.config({
    path: './.env'
});

dbConnection()
.then(()=>{
    app.listen(5000, () => {
        console.log("Server is running on port 5000 🚀");
    });
    console.log("Connected to MONGODB!");
}).catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
});