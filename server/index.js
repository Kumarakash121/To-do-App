import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts));
app.listen(4000, () => {
    console.log('server is up')
})