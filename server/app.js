import dotenv from 'dotenv'

dotenv.config()
import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
// // app.use(cors(({
// //     origin:["https://to-do-app-frontend-liart.vercel.app"],
// //     methods:["POST","GET","PUT","DELETE"],
// //     credentials:true,
// // })));
const allowedOrigins = ['https://to-do-app-frontend-liart.vercel.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
import user from '../server/routes/user.js'
import todo from '../server/routes/todo.js'

app.use('/user', user)
app.use('/todo', todo)

// app.use(cors({
//     origin: 'http://localhost:3001',
// }))

export default app