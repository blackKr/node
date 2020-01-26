

const http = require('http');
const events = require('events');
const fs = require('fs');
const queryString = require('querystring');
const urlLib = require('url');

const eventEmitter = new  events.EventEmitter(); // 核心就是事件触发与事件监听器功能的封装

let connectHandler = function connected() { // 创建事件处理程序
	console.log('连接成功');

	eventEmitter.emit('data_received');   // 触发 data_received 事件
};

eventEmitter.on('connection',connectHandler); // 绑定 connection 事件处理程序

eventEmitter.on('data_received',function () {  // 使用匿名函数绑定 data_received 事件
	console.log('数据接收成功');
});

eventEmitter.emit('connection'); // 触发 connection 事件

console.log('程序执行完毕');

http.createServer((req,res) => {
	// const url = req.url;
	// let file_name = './www'+url;
	// console.log("----- url ----",url);

	let str = "";
	let i = 0;
	req.on('data',(data) => {
		console.log(`第${i++}次`);
		str += data;
	});

	req.on('end',() => {
		console.log(str);
		console.log(queryString.parse(str));
	});

	// let old = urlLib.parse(url,true);
	// console.log(old.pathname);
	// console.log(old.query);

	// res.write(getObj.toString());
	// res.end();

	// fs.readFile(file_name,(err,data) => {
	// 	if ( err ) {
	// 		res.write(err);
	// 	} else {
	// 		res.write(data);
	// 	}
	// 	res.end();
	// });

	// response.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(8088);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8088/');