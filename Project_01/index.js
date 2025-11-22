const express = require("express");
const fs = require("fs");


const mongoose = require("mongoose");

let users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

// for connection to mongo db database
mongoose.connect("mongodb://127.0.0.1:27017/YouTube_Project_01")
    .then(() =>
        console.log("MongoDB connected successfully "))
    .catch((err) => console.log(":MongoDB error", err));


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



//concept of midlleware in express js---------

// middleware to parse json data
//1st midleware
app.use(express.urlencoded({ extended: false }));   // jo bhi data ayega, usko body main daalne ka kaam krta ha

//2nd midleware
app.use((req, res, next) => {
    fs.appendFile("Log2.txt", `\n${Date.now()}:${req.method}:${req.path}`, (err, data) => next());


})
// 3rd midleware
app.use((req, res, next) => {
    console.log("hello from the midddle ware 3");

    next();
})






app.get("/", (req, res) => {
    res.setHeader("Content-Type", "shujaullah");
    res.end("hello form home page");

});

// 1st work
app.get("/api/users", async (req, res) => {    // this for getting all user in JSON format 

    const allDbUsers = await User.find({});
    console.log("X-content", "shuja_ullah");  // always start the custom header with capital X, for good practices
    return res.json(allDbUsers);
});



// getting all username only in html format
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});

    const html =
        `<ul>
              ${allDbUsers.map((user) => `<li>${user.first_name},email-,${user.email}`).join("")}
         </ul>`


    res.send(html);
});






// 2nd work
app.get("/api/user/:id", async (req, res) => {
    const id = req.params.id;     // it give a string , not a number

    const user = await User.findById(id);
    if (!user) { return res.status(404).json({ status: "user not found" }); }
    return res.json(user);
})

app.post("/api/users", async (req, res) => {
    const body = req.body;  // jo bhi data ham ,fronted main send krte han , wo ismain available hota ha 

    users.push({ ...body, id: users.length + 1 });

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: `all field are req.....` });
    }


    //we dont do this ,when MongoDB is used
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "success" });
    // })

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,

    });


    return res.status(201).json({ status: "success" });



     


})



app.patch("/api/user/:id", async(req, res) => {

    const id = req.params.id;
    const body = req.body;


    //it is used for Mockdata
    // users = users.map((user) => {
    //     if (user.id == id) {
    //         return { ...user, ...body }
    //     }

    //     return users;
    // })


     users = await User.findByIdAndUpdate(id,{last_name:body.last_name});
    return res.status(200).json({status:"success"});
})

app.delete("/api/user/:id", async(req, res) => {


    // this for Mockdata json file , not for mongoDB database
    // users = users.filter((us) => us.id != req.params.id);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "success" })
    // })

    const id=req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({status:"success"});


})


// when i am adding or Post the data , it is not getting ,because they dont know the type of datawe are sending 
// so we use middleware or Plugin, for this work
// you do   also using app.route(), when the route of 2 or more is same 
// app.
//     route("/api/user/:id")
//     .get("/api/user/:id", (req, res) => {
//         const id = req.params.id;     // it give a string , not a number

//         const user = users.map((user) => {
//             if (user.id == id) {
//                 return res.json(user);
//             }
//         })
//     })
//     .patch("/api/user/:id", (req, res) => {
//         //TODO:UPDATE THE USER WITH ID
//         return res.json({ status: "pending" })
//     })
//     .delete("/api/user/:id", (req, res) => {
//         //TODO:DELETE THE USER WITH ID
//         return res.json({ status: "pending" })
//     })




app.listen(PORT, (error, data) => {
    if (error) {
        console.log("server went wrong", error);

    }
    else {
        console.log("server is running ");
    }
})

