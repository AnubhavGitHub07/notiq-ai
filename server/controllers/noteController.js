import Note from "../models/note.js";

// Create Note

const createNote = async ( req , res ) =>{
    try{
        const{ title , content } = req.body;

        if(!title || !content){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user._id,
        });

        res.status(201).json(note);
    }

    catch(error){
        console.error("Create Note Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Read ~ Find Notes ( of users those who have access )

const getNotes = async ( req , res ) =>{
    try{
        const notes = await Note.find({
          user :  req.user._id
        }).sort("-createdAt");

        res.status(200).json(notes);
    }

    catch(error){
        console.error("Get Notes Error:" , error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Update Note

const updateNote = async ( req , res ) =>{
    try{
        const { title , content} = req.body;

        const note = await Note.findById(req.params.id);

        if(!note){
            return res.staus(404).json({
                message: "Note not found"
            });
        }

        // check ownership before giving access to update

        if(note.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    }

    catch(error){
        console.error("Update Note Error:", error);
        res.status(500).json({
            message : "Server Error"
        });
    }
};

// Delete Note
