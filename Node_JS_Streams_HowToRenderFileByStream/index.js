import express from 'express'
import fs from 'fs';

import zlib from "zlib";

import expressmonitor from 'express-status-monitor'
const PORT = 3000
const app = express()


app.use(expressmonitor());

fs.createReadStream("./index.html").pipe(zlib.createGzip()).pipe(fs.createWriteStream("./index.zip"));


app.get('/', (req, res) => {


    const stream = fs.createReadStream("./index.html", "utf-8");

    stream.on("data", (chunk) => res.write(chunk));

    stream.on("end", () => res.end());

})

app.get("/server",(req,res)=>{
    return res.json(`hello from express server ${process.pid}`);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})