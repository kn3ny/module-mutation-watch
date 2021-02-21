const Module1 = require("./lib/module1");

const main = () => {
    console.log("Hello from index.js");
    const module1 = new Module1();
    module1.method1(Date.now());
};

main();
