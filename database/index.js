const nr = require("newrelic");
const cn = {
  host: "localhost",
  port: 5432,
  database: "commentsSection",
  user: "root",
  password: "0000"
};

const pgp = require("pg-promise")();
var postgres = pgp(cn);

postgres
  .proc("version")
  .then(data => {
    console.log(
      `Connected to ${data.version
        .split(" ")
        .slice(0, 4)
        .join(" ")}`
    );
  })
  .catch(error => {
    console.log("Failed to connect to PostgreSQL");
  });
let genre = "comments";
const GetAllCommentsForId = function(songId) {
  console.log("Get All:");
  if (songId <= 10000000) genre = "country";
  if (songId <= 9000000) genre = "rap";
  if (songId <= 8000000) genre = "pop";
  if (songId <= 7000000) genre = "rock";
  if (songId <= 6000000) genre = "jazz";
  if (songId <= 5000000) genre = "funk";
  if (songId <= 4000000) genre = "blues";
  if (songId <= 3000000) genre = "80's";
  if (songId <= 2000000) genre = "metal";
  if (songId <= 1000000) genre = "classical";
  return postgres.query(`SELECT * FROM ${genre} WHERE "songId" = ${songId} ;`);
};

const AddOne = function(comment) {
  console.log(comment);
  console.log("AddOne Called:");
  return postgres.query(
    `INSERT INTO ${genre} ("songId", "genre", "textContent", "dateCreated", "username") VALUES(${
      comment.songId
    }, '${genre}', '${comment.textContent}', '${comment.dateCreated}', '${
      comment.user
    }') RETURNING *;`
  );
};

module.exports = {
  GetAllCommentsForId,
  AddOne
};
