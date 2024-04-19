import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
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


app.listen(4000, () => {
    console.log('server is up')
})