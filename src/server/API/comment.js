let dbs = require("../db/index");

exports.get = (req, res) => {
  var sql = "select * from comment";
  dbs.query(
    sql,
    [
      req.query.content,
      req.query.user_id,
      req.query.user_name,
      req.query.post_id,
      req.query.comment_date,
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
  const { content, userId, userName, postId, commentDate } = req.body;
  dbs.query(
    "INSERT INTO comment (content,user_id,user_name,post_id,comment_date) VALUES (?,?,?,?,?)",
    [content, userId, userName, postId, commentDate],
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
