const cluster = require('node:cluster');

const os = require("os");

const numCPUs = os.cpus().length;


console.log(numCPUs)


// then we make instances of the server, 
// which is equal to the number of CPU cores we have,
//  so that we can utilize all the cores and make our server
//  more efficient and faster
if (cluster.isPrimary) {

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}
else{
     const express=require("express");
     const PORT = 3000;
     const app = express();

     app.get("/",(req,res)=>{
        return res.json(`hello from express server ${process.pid}`);

     })

     app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT} with process id ${process.pid}`)
     })



}