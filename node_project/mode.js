

// module.exports = {
//     a: 1223,
//     b: 343
// };


module.exports = class {
    constructor(name) {
        this.name = name;
    }

    show() {
        console.log(this.name);
    }
};
