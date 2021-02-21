class Module1 {
    constructor() {
        console.log("Module1 initialized");
        this.mutableVal1 = Date.now();
    }

    method1(unixtime) {
        console.log("Module1 method1");
        this.mutableVal1 = unixtime;
    }
}

module.exports = Module1;
