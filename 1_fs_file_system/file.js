const fs=require("fs")
const os = require("os");
// console.log("Hello World");

// fs.writeFileSync('./test.txt',"Hello writeFileSync");

// fs.writeFile('./test1.txt',"Hello writeFile",(err)=>{});

// const result=fs.readFileSync("./test.txt","utf-8");

// console.log("readFileSync result ->",result);

// fs.readFile('./test1.txt','utf-8',(err,result)=>{
//     if(err) console.log("Error",err);
//     else console.log(result);
// })

fs.appendFileSync('./test.txt',` ${Date.now()} Kushal \n`)

// fs.cpSync("./test.txt","./copy.txt");

// fs.unlinkSync("./copy.txt")

// console.log(fs.statSync("./test.txt"));

// fs.mkdirSync("my")
console.log(os.cpus().length);