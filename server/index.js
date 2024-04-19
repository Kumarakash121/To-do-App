import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
// const corsOpts = {
//     origin: 'https://to-do-app-frontend-liart.vercel.app',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
  
//     allowedHeaders: [
//       'Content-Type',
//     ],
//   };
// app.use(cors(corsOpts));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(4000, () => {
    console.log('server is up')
})