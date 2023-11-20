let dbs = require("../db/index");

exports.get = (req, res) => {
  var sql = "select * from post";
  dbs.query(
    sql,
    [
      req.query.title,
      req.query.content,
      req.query.user_id,
      req.query.user_name,
      req.query.publish_date,
    ],
    (err, data) => {
      if (err) {
        return res.send("错误：" + err.message);
      }
      res.send(data);
    }
  );
};
exports.post = (req, res) => {
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
