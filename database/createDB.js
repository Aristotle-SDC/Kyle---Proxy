let cn;
let schema = `(
    "id" serial PRIMARY KEY,
    "songId" int NOT NULL,
    "genre" VARCHAR(20) NOT NULL,
    "textContent" VARCHAR(200) NOT NULL,
    "dateCreated" date NOT NULL,
    "username" VARCHAR(100) NOT NULL
);`;

const pgp = require("pg-promise")();
// var postgres = pgp(cn);
const genres = [
  "classical",
  "country",
  "metal",
  "80s",
  "blues",
  "funk",
  "jazz",
  "rock",
  "pop",
  "rap"
];

let createDatabase = function() {
  cn = {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "root",
    password: "0000"
  };
  var postgres = pgp(cn);
  // postgres.query(' drop database "commentsSection";')
  postgres.query('CREATE DATABASE "commentsSection";');
};
createDatabase();

setTimeout(function() {
  cn = {
    host: "localhost",
    port: 5432,
    database: "commentsSection",
    user: "root",
    password: "0000"
  };
  var postgres = pgp(cn);
  postgres.query(`CREATE TABLE  "comments" ${schema};`);
  for (var i = 0; i < genres.length; i++) {
    postgres.query(`CREATE TABLE  "${genres[i]}" ${schema};`);
  }
}, 1000);
console.log("Successfully Created Database");
