

const http = require('http');
const queryString = require('querystring');
const fs = require('fs');
const urlLib = require('url');

let users = {};

http.createServer((req,res) => {
	let str = "";
	req.on('data',(data) => {
		str += data;
	});
	req.on('end',() => {
		let obj = urlLib.parse(req.url,true);
		const url = obj.pathname;
		const POST = queryString.parse(str);

		console.log('--- obj ---',obj);
		console.log('--- url ---',url);
		console.log('--- post ---',POST);

		let GET = obj.query['act'] !== undefined ? obj.query:POST;

		console.log('--- GET ---',GET);

		if ( url === '/user' ) {
			do {
				if ( GET.act === 'reg' ) {
					if ( users[GET.user] ) {
						res.write("{'ok':false,'msg':'此用户名已注册'}");
					} else {
						users[GET.user] = GET.pass;
						res.write("{'ok':true,'msg':'注册成功'}");
					}
					break;
				}

				if ( GET.act === 'login' ) {
					if ( users[GET.user] === null ) {
						res.write("{'ok':false,'msg':'此用户不存在'}");
					} else if ( users[GET.user] !== GET.pass ) {
						res.write("{'ok':false,'msg':'用户名或密码不对'}");
					} else {
						res.write("{'ok':true,'msg':'登陆成功'}");
					}
					break;
				}

				res.write("{'ok':false,'msg':'未知的act'}");
			}while (false);
			res.end();
		}
		else if (url.indexOf("/index.html") >= 0) {
            let file_name = url.replace("/","");
            fs.readFile(file_name,(err,data) => {
                if ( err ) {
                    res.write('404');
                } else {
                    res.write(data.toString());
                }
                res.end();
            });
		}
		else {
			let file_name = './www' + url;
			fs.readFile(file_name,(err,data) => {
				if ( err ) {
					res.write('404');
				} else {
					res.write(data.toString());
				}
				res.end();
			});
		}
	});
}).listen(8099);
