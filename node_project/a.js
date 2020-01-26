


console.error(new Date());
// console.error(process.env);
console.error(process.argv);

let num1 = parseInt(process.argv[2]);
let num2 = parseInt(process.argv[3]);
console.error(num1+num2);

console.error(__dirname);

let path = require("path");
console.log(path.dirname("node/a/b/c/1.jpg"));
console.log(path.basename("node/a/b/c/1.jpg"));
console.log(path.extname("node/a/b/c/1.jpg"));
console.log(path.resolve("node/a/b/c", "../../", "D"));
console.log(path.resolve(__dirname, "a.js"));

let fs = require("fs");
fs.readFile("./b.text", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data.toString());
    }
});

fs.writeFile("./c.text", "谁是谁的谁", {flag: "a"}, (error) => {
    if (error) {
        console.log(error);
    }
});

let data = fs.readFileSync("./c.text");
console.log(data.toString());

fs.writeFileSync("./c.text", "怎么了", {flag: "a"});


let mode = require("./mode");
// console.error(mode.a);
console.log(new mode("张三").show());
