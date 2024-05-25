const http=require("http");
const fs=require('fs');
const url =require("url");

const PORT =8000;

const myServer=http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return res.end();
    const log =`${Date.now()}:${req.method} ${req.url} New Req received \n`;
    const myUrl=url.parse(req.url,true);
    console.log("my URL",myUrl);
    fs.appendFile("log.txt",log,(err,data)=>{
        if(err) console.log("Error",err)
        // res.end("Hello from server");
    switch(myUrl.pathname) {
        case "/" : res.end("HomePage");
        break;
        case '/about':
            const userName=myUrl.query.name;
            const loverName=myUrl.query.love;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<p> Hii ${userName} &  ${loverName}</p>`);
        break;

        case "/search":
            const search=myUrl.query.search_query;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<p> Love percentage of ${search} is 100% </p>
            <p> Fiendship percentage of ${search} is 100% </p>
            `)
    break;
        default: res.end("404 not found");
        break;
    }

    })
})

myServer.listen(PORT,()=>console.log("server Started at",PORT))
