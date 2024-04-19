import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
const corsOpts = {
    origin: 'https://to-do-app-frontend-liart.vercel.app',
  
    methods: [
      'GET',
      'POST',
    ],

  };
app.use(cors(corsOpts));


app.listen(4000, () => {
    console.log('server is up')
})