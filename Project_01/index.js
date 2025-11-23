const express = require("express");


let users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");

const { logReqRes } = require("./middleware")
const { connectMongoDb } = require("./connections");




// for connection to mongo db database    
connectMongoDb("mongodb://127.0.0.1:27017/YouTube_Project_01")
    .then(() => console.log("MongoDB connected Successfully"))
    .catch((err) => console.log("Error in DB connection", err));







//concept of midlleware in express js---------

// middleware to parse json data
//1st midleware
app.use(express.urlencoded({ extended: false }));   // jo bhi data ayega, usko body main daalne ka kaam krta ha

//2nd midleware
app.use(logReqRes("Log2.txt"));
// 3rd midleware
app.use((req, res, next) => {
    console.log("hello from the midddle ware 3");

    next();
})
//---------------------------------------------------------------


app.use("/api/user", userRouter);    // "/user" ye "/api/users" or "/api/user/:id" dono k liye common ho gya, because ab ye userRouter k andar ja k dono route ko handle kr dega



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

