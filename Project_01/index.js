const express = require("express");

const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    res.end("hello form home page");

});

// 1st work
app.get("/api/users", (req, res) => {    // this for getting all user in JSON format 
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

app.post("/api/user", (req, res) => {
    //TODO:ADD NEW USER

    return res.json({ status: "pending" });
})

app.patch("/api/user/:id", (req, res) => {
    //TODO:UPDATE THE USER WITH ID
    return res.json({ status: "pending" })
})

app.delete("/api/user/:id", (req, res) => {
    //TODO:DELETE THE USER WITH ID
    return res.json({ status: "pending" })
})







app.listen(PORT, (error, data) => {
    if (error) {
        console.log("server went wrong", error);

    }
    else {
        console.log("server is running ");
    }
})

