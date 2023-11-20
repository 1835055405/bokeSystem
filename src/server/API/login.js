let express = require("express");
let router = express.Router();
let dbs = require("../db/index");
let users = "";
exports.post = (req, res) => {
  const { user_name, password } = req.body;
  dbs.query(
    "SELECT * FROM user WHERE user_name = ?",
    [user_name],
    (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        if (user.password == password) {
          const loginData = {
            username: user_name,
            pwd: password,
            userId: user.user_id,
          };
          res.status(200).json({ success: true, data: loginData });
        } else {
          res.status(401).json({ success: false, message: "用户名或密码错误" });
        }
      } 
      else {
        // 用户不存在
        res.status(401).json({ success: false, message: "用户名或密码错误" });
      }
    }
  );
};
