let dbs = require("../db/index");
exports.get = (req, res) => {
  const { senderId } = req.query;
  console.log(senderId);
  try {
    // 获取用户的好友申请列表
    dbs.query(
      "SELECT  f.id AS friendship_id,  f.user_id_1 AS other_user_id,  u.user_name  FROM  friendships f JOIN user u ON f.user_id_1 = u.user_id  WHERE  f.user_id_2 = ?  AND f.status = 'pending';",
      [senderId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          // 查询成功，results 是查询结果数组
          console.log("Query results:", results);
          return res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    console.error("Error getting user friends:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.post = (req, res) => {
  const { senderId, receiverId, status } = req.body.params;
  try {
    // 检查是否已经是好友或有待处理的请求
    if (status == "accepted") {
      dbs.query(
        "UPDATE friendships  SET status = ?  WHERE  (user_id_1 = ? OR user_id_2 = ?)  AND  (user_id_1 = ? OR user_id_2 = ?)  AND  (user_id_1 != user_id_2);",
        [status, senderId, senderId, receiverId, receiverId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          } else {
            // 查询成功，results 是查询结果数组
            console.log("Query results:", results);
            return res.status(200).json(results);
          }
        }
      );
    } else {
      dbs.query(
        "DELETE FROM friendships  WHERE  (user_id_1 = ? AND user_id_2 = ?)  OR  (user_id_1 = ? AND user_id_2 = ?);",
        [senderId, receiverId, receiverId, senderId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          } else {
            // 查询成功，results 是查询结果数组
            console.log("Query results:", results);
            return res.status(200).json(results);
          }
        }
      );
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
