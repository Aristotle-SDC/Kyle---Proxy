const nr = require("newrelic");
const express = require("express");
var fs = require("fs");
const bodyParser = require("body-parser");
const db = require("../database");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("./client/public/"));
app.use(/\/\d+\//, express.static("./client/public/"));

app.get("/api/comments/:id", (req, res) => {
  db.GetAllCommentsForId(req.params.id)
    .then(response => {
      console.log("RESPONSE FROM DATABASE", response);
      res.send(response.sort((a, b) => b.id - a.id));
    })
    .catch(error => console.log(error));
});

app.post("/api/comments/:id", (request, response) => {
  // console.log("post", req.body);
  db.AddOne(request.body)
    .then(res => response.send(res))
    .catch(error => console.log(error));
});

app.post("/api/comments/remove/:id", (request, response) => {
  console.log("DELEEEETE", request.body);
  db.deleteComment(request.body)
    .then(response => response)
    .catch(error => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Server running on Localhost:${PORT}`);
});
