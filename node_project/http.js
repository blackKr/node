

let http = require("http");
let fs = require("fs");

http.createServer((req, res) => {
    console.log(req.url);

    fs.readFile(`./${req.url}`, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("404 not found");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    })
}).listen(8888);
