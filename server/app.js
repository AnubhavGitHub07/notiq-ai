import express from "express"; 
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health" , (req , res) =>{ // Health Check API
    res.status(200).json({
        message:"Server is running"
    });
});

export default app; // Exporting the app