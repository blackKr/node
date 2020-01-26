

let http = require("http");
let querystring = require("querystring");

http.createServer((req, res) => {
    let result = [];
    req.on("data", buffer => {
        result.push(buffer);
    });
    req.on("end", () => {
        let data = Buffer.concat(result);

        console.log(querystring.parse(data.toString()));
    });
}).listen(8888);
