const express = require("express");

// this module is use  to work with file and directory paths, okkkkkk
const path = require("path");

const multer = require('multer')    // this is used to handle the file upload , ookk


const PORT = 8000;
const app = express();

 

// this is for the template engine setup
app.set("view engine", "ejs");


// this is for the view engine setup
app.set("views", path.resolve("./views"));



//  this middleware is used to parse the jason data, ookkkkk
app.use(express.json());

// this middleware is use to parse the form data in to json format , please see the previous one if nopt cleared 
app.use(express.urlencoded({ extended: false }));




/////////////////////////////: Multer Storage Configuration/////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {              // destination mein ye btate han, ke konse folder ke andr file store karni hai(req- ha ki jo ham try kr rhe han, or file - wo ha jo file upload ho rhi ha and cb - callback function)

        return cb(null, "./uploads") // ye uploads folder ke andr store kr dega
        // or null ka matlab ha ke error nahi ha


    },
    filename: function (req, file, cb) {          // yha pr file ka name kya hoga, wo btate han

        return cb(null, `${Date.now()}-${file.originalname}`)       // ye file ka name aise hoga ke pehle time stamp ayega or phir original name ayega
        // or null ka matlab ha ke error nahi ha
    }
})
////////////////////////////////////////////


///// Create Multer Instance

const upload = multer({ storage: storage })


//Lines 54-56: Homepage Route
app.get("/", (req, res) => {
    return res.render("homepage");

})

///File Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);   // req file is the image file which is uploaded

    return res.redirect("/");

})



app.listen(PORT, () => {
    console.log("server is running on the port " + PORT);

});