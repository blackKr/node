

let fs = require('fs');

fs.readFile('./input.txt',(err,data) => {
  if ( err ) {
  	console.log(err);
	} else {
		console.log(data.toString());
	}
});

fs.writeFile('b.txt','aaassddsasa',(err) => {
	console.log(err);
});

console.log('程序执行结束');