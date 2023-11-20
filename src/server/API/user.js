let dbs = require("../db/index");

exports.get = (req, res) => {
  var sql = "select * from user";
  dbs.query(sql, [req.query.user_name, req.query.password], (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
    res.send(data);
  });
};
