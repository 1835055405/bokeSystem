let dbs = require("../db/index");
exports.post = (req, res) => {
  const { userName, password, registerDate } = req.body;
  dbs.query(
    "SELECT * FROM user WHERE user_name = ?",
    [userName],
    (err, results) => {
      if (err) {
        console.error("Error querying the database: ", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        res.status(401).json({ success: false, message: "用户名已存在！" });
      } else {
        dbs.query(
          "INSERT INTO user (user_name,password,register_date) VALUES (?,?,?)",
          [userName, password, registerDate],
          (err, results) => {
            if (err) {
              console.error("Error inserting into Mysql", err);
              res.status(500).send("Intrenal Server Error");
            } else {
              const user = results;
              const loginData = {
                username: userName,
                pwd: password,
                userId: user.user_id,
              };
              res.status(200).json({ success: true, data: loginData });
            }
          }
        );
      }
    }
  );
};
