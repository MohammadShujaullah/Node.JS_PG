const express = require("express");
const fs = require("fs");

let users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;


//concept of midlleware in express js---------

// middleware to parse json data
//1st midleware
app.use(express.urlencoded({ extended: false }));   // jo bhi data ayega, usko body main daalne ka kaam krta ha

//2nd midleware
app.use((req,res,next)=>{
     fs.appendFile("Log2.txt",`\n${Date.now()}:${req.method}:${req.path}`,(err,data)=> next());
    
   
})
// 3rd midleware
app.use((req,res,next)=>{
    console.log("hello from the midddle ware 3");
    
     next();
})






app.get("/", (req, res) => {
  res.setHeader("Content-Type", "shujaullah");
    res.end("hello form home page");

});

// 1st work
app.get("/api/users", (req, res) => {    // this for getting all user in JSON format 
     console.log("X-content","shuja_ullah");  // always start the custom header with capital X, for good practices
    return res.json(users);
});

// getting all username only in html format
app.get("/users", (req, res) => {
    const html =
        `<ul>
              ${users.map((user) => `<li>${user.first_name}`).join("")}
         </ul>`


    res.send(html);
});






// 2nd work
app.get("/api/user/:id", (req, res) => {
    const id = req.params.id;     // it give a string , not a number

    const user = users.map((user) => {
        if (user.id == id) {
            return res.json(user);
        }
    })
})

app.post("/api/users", (req, res) => {
    const body = req.body;  // jo bhi data ham ,fronted main send krte han , wo ismain available hota ha 

    users.push({ ...body, id: users.length + 1 });

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender ||!body.job_title){
        return res.status(400).json({msg:`all field are req.....`});
    }

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ satus: "success" });
    })
    console.log("Body", body);


})



app.patch("/api/user/:id", (req, res) => {

    const id = req.params.id;
    const body = req.body;
    users = users.map((user) => {
        if (user.id == id) {
            return { ...user, ...body }
        }

        return users;
    })
})

app.delete("/api/user/:id", (req, res) => {

    users = users.filter((us) => us.id != req.params.id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success" })
    })

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

