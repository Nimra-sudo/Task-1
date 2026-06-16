const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = {
  user: "sa",
  password: "your_password",
  server: "localhost",
  database: "AlonziiDB",
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM Users
      WHERE UserName = ${username}
      AND Password = ${password}
    `;

    if (result.recordset.length > 0) {
      res.send({ success: true, message: "Login Successful" });
    } else {
      res.send({ success: false, message: "Invalid login" });
    }

  } catch (err) {
    res.send(err);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});