//import http module
const http=require("http");
  
const fs=require("fs");

const url=require("url");

const express=require("express");


function handler(req,res){    //req=request,  res=response

      if(req.url==="favicon.ico"){
        res.end();   // ye favicon ki request ko ignore krne k liye h ta k baar baar log na bnay
      }
      console.log(req.url);

      const myurl=url.parse(req.url);
      console.log(myurl.pathname);

    const log= `${Date.now()}:${req.method} ${req.url} New Req recieved\n`;
     fs.appendFile("log.txt",log,(err,data)=>{     // file bnne ke baad response wha jae.
         switch(req.url){
            case '/':res.end("this is home "); 
            break;
            case '/about':
            const username=myurl.query.username;
         
            res.end(`hi${username}`);
            break;
            case '/signup':
              if(req.method==="GET")res.end("this is signup page");
              else if(req.method==="POST")
                //db Query
              res.end("data saved successfully");
              break;
            default :res.end("404 not found");
         }
     })
    
}


//create server object
const myserver=http.createServer(handler);


//server listening on port 8000
myserver.listen(8000,()=>{
    console.log("my server is started");
})