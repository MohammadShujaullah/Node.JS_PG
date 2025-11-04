const Math=require('./Math');


const os=require("os");
console.log("CPU core length=",os.cpus().length)
 


// also we can do destructeing of exported modules like this->

// const {add,sub}=require('./Math'); in place of <-const Math=require('./Math');



console.log("Hello, World!"); 
 console.log(Math.add(3,2));


 //after destructing 
 //console.log(add(3,2));





