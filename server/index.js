import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
// app.use(cors({
//     origin:"https://to-do-app-frontend-liart.vercel.app",
//     credentials:true,
// }))
// app.use(function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     const allowedOrigins = ['https://to-do-app-frontend-liart.vercel.app',''];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//     next();
//   });

const options = [
  cors({
    origin: 'https://to-do-app-frontend-liart.vercel.app',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];
app.use(options);
app.listen(4000, () => {
    console.log('server is up')
})