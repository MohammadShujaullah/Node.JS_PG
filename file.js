const fs=require("fs");
  

// creating the file       ,  './'  means the we are going inside the current directory 
fs.writeFileSync("./Test.txt","hello i am shujaullah")
// this is Synchronous function it will block the code until the file is created


// this is Asynchronous function it will not block the code until the file is created
fs.writeFile("./Test.txt","hello i am md shujaullah waao",(err)=>{
    console.log(("error",err))
})




//------------write/append------------
// the 'writefile' is used to create and override the data of the file
// to append the data we use appendfile
fs.appendFileSync("./Test.txt","\n shujaullah -91")




//READ--------------

// HERE sychronous return the data direcctly ,while asynchronous expect a callback function 
const result=fs.readFileSync("./Contact.txt","utf-8")
// here utf-8 is used to convert the buffer data into string data otherwise it will return buffer data

console.log(result);


fs.readFile("./Contact.txt","utf-8",(err,data)=>{
    if(err){
        console.log("error",err);
    }
    else{
        console.log(data);
    }
})


//--copy file-----
fs.copyFileSync("Test.txt","Testcopy.txt")

//---delete file----
fs.unlinkSync("Testcopy.txt")


//---get info about file----
fs.statSync("./Test.txt")  // it will give the info about the file like size ,created time etc


//--make directory/folder----
fs.mkdirSync("Newfolder")