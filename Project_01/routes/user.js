const express = require("express");

const router = express.Router();

const { handleGetAllUsers, handlegetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateUser } = require("../controllers/user");





// router.get("/", (req, res) => {
//     res.setHeader("Content-Type", "shujaullah");
//     res.end("hello form home page");

// });





// 1st work
router.get("/", handleGetAllUsers);    // this for getting all user in JSON format 


//-------------------------------------------------
// getting all username only in html format
// router.get("/users", async (req, res) => {
//     const allDbUsers = await User.find({});

//     const html =
//         `<ul>
//               ${allDbUsers.map((user) => `<li>${user.first_name},email-,${user.email}`).join("")}
//          </ul>`


//     res.send(html);
// });
//----------------------------------------------------





// 2nd work
router.get("/:id", handlegetUserById);   // this for getting user by id


router.post("/", handleCreateUser);  // this for creating user

router.patch("/:id", handleUpdateUserById);   // this for updating user by id

router.delete("/:id",handleDeleteUserById); // this for deleting user by id


module.exports = router;
