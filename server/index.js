import app from './app.js'
import connectDB from "./config/db.js";
import cors from "cors";
connectDB()
app.use(cors({
    origin:"https://to-do-app-frontend-liart.vercel.app",
    credentials:true,
}))


app.listen(4000, () => {
    console.log('server is up')
})