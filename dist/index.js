const express = require('express');

const app = express();
const port = 3000;

const UserModule = require("./lib/user");

const module1 = new UserModule();
app.get('/', async (req, res) => {
  const user = req.query["user"];
  module1.setUserId(user);
  const getUserFromDB = await new Promise(resolve => {
    setTimeout(() => {
      // 2秒かかる処理
      resolve(module1.getUserId());
    }, 100);
  });
  return res.json({
    user: getUserFromDB
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); // then run
// echo -n "a b c" | xargs -P 3 -d ' ' -I {} curl "http://localhost:3000/?user={}"