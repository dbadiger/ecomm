import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connect_DB from './config/mongodb.js';
import connect_Cloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import bodayparser from 'body-parser'
const app=express();
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(bodayparser.json())
app.use(cors())

connect_DB();
connect_Cloudinary();

//api endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res)=>{
    res.send('Express Server Working!')
})

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`)
})