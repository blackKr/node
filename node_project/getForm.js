

let http = require("http");
let url = require("url");

http.createServer((req,  res) => {
    console.error(req.url);

    let {pathname, query} = url.parse(req.url, true);
    console.error(pathname, query);
}).listen(8888);
