import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import uploadRoutes from "./routes/uploadRoute.js"
import appointmentRoute from "./routes/appointmentRoute.js"
import path from "path";


dotenv.config()

const app = express();
const port = 5000 || process.env.port;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded());

app.use('/api/user',userRoutes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/upload", uploadRoutes);
app.use('/api/appointment',appointmentRoute);

const connectDB = async () => {
  try {
    
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4, // Force IPv4
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

app.get('/',(req,res)=>{
    res.send("Server is ready")
})


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
});
