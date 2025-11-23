const mongoose = require("mongoose");

// Schema formation 
const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,        // doest have to repeat the same email for 2 different user 
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    }


}, { timestamps: true })

//this is (model creation) for userschema, which help us to do the CRUD operation
const User = mongoose.model("User", userSchema);


module.exports=User;
