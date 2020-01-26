

const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const urlLib = require('url');

let server = http.createServer((req,res) => {
	// get
	let obj = urlLib.parse(req.url,true);
	const GET = obj.query;
	const pathname = obj.pathname;
	console.log(GET);

	// post
	let str = "";
	req.on('data',(data) => {
		str += data;
	});
	req.on('end',() => {
		console.log('--- str ---',queryString.parse(str));
	});

	// file
	const file_name = './www' + pathname;
	console.log('--- file_name ---',typeof file_name);
	fs.readFile(file_name,(err,data) => {
		if ( err ) {
			res.write(404);
		} else {
			res.write(data.toString());
		}
		res.end();
	})
});
server.listen(8088);