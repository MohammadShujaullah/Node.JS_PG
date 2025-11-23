const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    console.log("X-content", "shuja_ullah");  // always start the custom header with capital X, for good practices
    return res.json(allDbUsers);
}


async function handlegetUserById(req, res) {
    const id = req.params.id;     // it give a string , not a number

    const user = await User.findById(id);
    if (!user) { return res.status(404).json({ status: "user not found" }); }
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const id = req.params.id;
    const body = req.body;


    //it is used for Mockdata
    // users = users.map((user) => {
    //     if (user.id == id) {
    //         return { ...user, ...body }
    //     }

    //     return users;
    // })


    users = await User.findByIdAndUpdate(id, { last_name: body.last_name });
    return res.status(200).json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
    // this for Mockdata json file , not for mongoDB database
    // users = users.filter((us) => us.id != req.params.id);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "success" })
    // })

    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ status: "success" });
}

async function handleCreateUser(req, res) {
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
}



module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}