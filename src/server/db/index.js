let mysql = require("mysql");

let db = mysql.createPool({
  host: "127.0.0.1", //数据库IP地址
  user: "root", //数据库登录账号
  password: "123456", //数据库登录密码
  database: "bokesystem", //要操作的数据库
});
db.getConnection((err) => {
  if (err) {
    console.log("database connection error:", err);
  } else {
    console.log("success connected to database");
  }
});
module.exports = db;
