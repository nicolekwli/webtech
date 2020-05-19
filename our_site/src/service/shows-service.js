const db = require("../../database/database.js");

exports.getProduction = async function(req, res) {
  let sql = "SELECT * FROM production";
  try {
    const rows = await db.all(sql);
    console.log(rows);
    return rows;
  } catch (err) {
    res.status(500).json({"error":`Database error: ${err}`});
  }
};