//import http module
//const http=require("http");
  
 

const express=require("express");


 const app=express();

 app.get("/",(req,res)=>{
  return res.send( `hello ${req.query.name} your age is ${req.query.age}` );
 });

 app.get("/about",(req,res)=>{
  return res.send("hello form about page"+"hey"+req.query.name+req.query.age);

 });


app.listen(8000,()=>{console.log("my server is started")})

//create server object
// const myserver=http.createServer(app);


// //server listening on port 8000
// myserver.listen(8000,()=>{
//     console.log("my server is started");
// })