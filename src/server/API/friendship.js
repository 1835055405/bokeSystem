let dbs = require("../db/index");
exports.get = (req, res) => {
  const { senderId } = req.body.params;
  try {
    // 获取用户的好友列表
    dbs.query(
      "SELECT	f.id AS friendship_id, 	CASE WHEN f.user_id_1 = ? THEN 	f.user_id_2 ELSE 	f.user_id_1 END AS other_user_id,  u.user_name FROM 	friendships f JOIN user u ON CASE WHEN f.user_id_1 = ? THEN 	f.user_id_2 ELSE 	f.user_id_1 END = u.user_id WHERE (	f.user_id_1 = ?	OR f.user_id_2 = ?) AND f. STATUS = 'accepted';",
      [senderId, senderId, senderId, senderId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          // 查询成功，results 是查询结果数组
          console.log("Query results:", results);
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    console.error("Error getting user friends:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.post = (req, res) => {
  const { senderId, receiverId } = req.body.params;
  try {
    // 检查是否已经是好友或有待处理的请求
    dbs.query(
      "SELECT * FROM friendships WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)",
      [senderId, receiverId, receiverId, senderId],
      (err, results) => {
        if (err) {
          console.error("Error executing the query:", err);
          // 处理错误
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          // 查询成功，results 是查询结果数组
          console.log("Query results:", results);
          // 处理查询结果
          if (results.length > 0) {
            return res.status(400).json({ error: "好友请求已存在或待处理！" });
          }
          // 创建好友请求
          if (senderId === receiverId) {
            return res.status(400).json({ error: "不能向自己发送好友请求！" });
          }
          dbs.query(
            "INSERT INTO friendships (user_id_1, user_id_2) VALUES (?, ?)",
            [senderId, receiverId],
            (err) => {
              if (err) {
                console.error("Error creating friend request:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              }
              // 查询和插入都成功后发送响应
              return res.status(200).json({ message: "好友请求已发送。" });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 获取用户的好友列表
