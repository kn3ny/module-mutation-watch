const express = require('express');
const app = express();

const OrderModule = require("./lib/order");
const order = new OrderModule();

app.get('/', async (req, res) => {
    order.setOrderId(req.query["order"]);

    const getOrderFromDb = await new Promise(resolve => {
        setTimeout(() => {
            // 2秒かかる処理
            resolve(order.getOrderId());
        }, 100);
    });

    return res.json({
        order: getOrderFromDb,
    });
});

app.listen(3000);

// then run
// echo -n "a b c" | xargs -P 3 -d ' ' -I {} curl "http://localhost:3000/?order={}"
