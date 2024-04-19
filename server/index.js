import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
app.use(cors({
    origin:'*',
    methods:["POST","GET"],
    credentials:true,
}));
app.listen(4000, () => {
    console.log('server is up')
})