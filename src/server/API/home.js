let dbs = require("../db/index");
exports.get = (req, res) => {
  var sql = "select * from post";
  const params = [];
  const { username } = req.query;
  if (username) {
    sql += " WHERE user_name = ?";
    params.push(username);
  }
  dbs.query(sql, params, (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
    res.send(data);
  });
};
exports.post = (req, res) => {
  console.log(req.body.userName._value);
  const { userId, userName, title, textarea, publishDate } = req.body;
  dbs.query(
    "INSERT INTO post (title,content,user_id,user_name,publish_date) VALUES (?,?,?,?,?)",
    [title, textarea, userId, userName, publishDate],
    (err, results) => {
      if (err) {
        console.error("Error inserting into Mysql", err);
        res.status(500).send("Intrenal Server Error");
      } else {
        console.log("Data Inserted into Mysql", results);
        res.send("Data inserted into Mysql");
      }
    }
  );
};
