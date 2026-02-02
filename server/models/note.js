import mongoose from "mongoose";

// note schema defined 

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },

        content:{
            type: String,
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note" , noteSchema); // create Note model

export default Note; // export note model