const express = require('express');
const app = express();
const port = 3000;

const Module1 = require("./lib/user");
const module1 = new Proxy(new Module1(), {
    set(obj, prop, value) {
        console.log(`${prop} = ${value}`);
        return Reflect.set(...arguments);
    }
});

app.get('/', async (req, res) => {
    const user = req.query["user"];

    module1.setUserId(user);

    const getUserFromDB = await new Promise(resolve => {
        setTimeout(() => {
            // 2秒かかる処理
            resolve(module1.getUserId());
        }, 2000);
    });

    return res.json({
        user: getUserFromDB,
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// then run
// echo -n "a b c" | xargs -P 3 -d ' ' -I {} curl "http://localhost:3000/?user={}"
