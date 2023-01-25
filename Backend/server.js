import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
let url="mongodb://localhost:27017/amazon"

dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
const connection_url = "<Connection Link>";

mongoose.connect("mongodb://localhost:27017/amazon", {useNewUrlParser:true,useUnifiedTopology: true }, function(err, db) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + url);
        //db.close();
    }
})

app.use(express.json());
app.use(cors());



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/',(req,res)=>res.status(200).send('Hello Debjit here. It is Amazon clone project.'))


// Listening to  server

app.listen(port,()=>console.log(`Listening on local host:${port}`))
