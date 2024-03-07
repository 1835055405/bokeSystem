let dbs = require("../db/index");
exports.get = (req, res) => {
  const info = req.query.info;
  console.log(info);
  dbs.query(
    "SELECT * FROM post WHERE title LIKE ? OR content LIKE ? OR user_name LIKE ?;",
    [info, info, info],
    (err, results) => {
      if (err) {
        console.error("Error inserting into Mysql", err);
        return res.status(500).send("Intrenal Server Error");
      } else {
        console.log("searched info from Mysql", results);
        return res.send(results);
      }
    }
  );
};
