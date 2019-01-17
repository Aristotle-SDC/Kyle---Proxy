const express = require("express");
var fs = require("fs");
const bodyParser = require("body-parser");
const db = require("../database");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static("./client/public/"));
app.use(/\/\d+\//, express.static('./client/public/'));

app.get("/api/comments/:id", (req, res) => {
  console.log("Req Params", req.params.id)
  db.GetAllCommentsForId(req.params.id)
    .then(response => {console.log(response); res.send(response)})
    // .then(response => );
});

// app.get("/api/singleComment", (req, res) => {
//   console.log("comment id: ", req.query);
//   db.GetOneComment(req.query.commentId, (err, comment) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send(comment);
//     }
//   });
// });

// app.post("/api/comments", (req, res) => {
//   db.AddOne(req.body, (err, comment) => {
//     if (err) {
//       console.log("error in express");
//       throw err;
//     } else {
//       console.log(comment);
//       res.send(200, comment.insertId);
//     }
//     // ^ Send insertId to client
//     // so that client can automatically add the correct comment
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on Localhost:${PORT}`);
});
