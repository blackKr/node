

const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

// 登陆注册
let user = {
    admin: 123456
};

http.createServer((req, res) => {
    let path, get, post;
    if (req.method === "GET") {
        let {pathname, query} = url.parse(req.url, true);
        path = pathname;
        get = query;
        complete();
    }
    else if (req.method === "POST") {
        path = req.url;
        let arr = [];
        req.on("data", buffer => arr.push(buffer));
        req.on("end", () => {
            post = querystring.parse(Buffer.concat(arr).toString());
            complete();
        });
    }

    function complete() {
        if (path === "/login") {
            res.writeHead(200, {
                "Content-Type" : "text/plain;charset=utf-8",
                "access-control-allow-origin": "*",
                "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            });
            let {username, password} = get;
            if (!user[username]) {
                res.end(JSON.stringify({
                    code: 400,
                    msg: "用户名不存在"
                }));
            }else if (user[username] != password) {
                res.end(JSON.stringify({
                    code: 400,
                    msg: "密码错误"
                }));
            }else {
                res.end(JSON.stringify({
                    code: 200,
                    msg: "登录成功"
                }));
            }
        }
        else if (path === "/reg") {
            res.writeHead(200, {
                "access-control-allow-origin": "*",
                "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            });
            let {username, password} = post;
            if (user[username]) {
                res.end(JSON.stringify({
                    code: 400,
                    msg: "用户已存在"
                }));
            }else {
                user[username] = password;
                res.end(JSON.stringify({
                    code: 200,
                    msg: "注册成功"
                }));
            }
        }
        else {
            fs.readFile(`pages${path}`, (err, data) => {
                if (err) {
                    res.end("404");
                }else {
                    res.end(data);
                }
            });
        }
    }
}).listen(8888);
