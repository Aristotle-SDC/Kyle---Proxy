
let cn;
let schema = `(
    "id" serial PRIMARY KEY,
    "songId" int NOT NULL,
    "genre" VARCHAR(20) NOT NULL,
    "textContent" VARCHAR(200) NOT NULL,
    "dateCreated" date NOT NULL,
    "username" VARCHAR(100) NOT NULL
);`

const pgp = require("pg-promise")();
// var postgres = pgp(cn);
const genres = ['classical', 'country', 'metal', '80s', 'blues', 'funk', 'jazz', 'rock', 'pop', 'rap']

let createDatabase = function (){
cn = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "root",
  password: "0000"
};
var postgres = pgp(cn);
  // postgres.query(' drop database "commentsSection";')
  postgres.query('CREATE DATABASE "commentsSection";')      
}
createDatabase();

setTimeout(function (){
cn = {
  host: "localhost",
  port: 5432,
  database: "commentsSection",
  user: "root",
  password: "0000"
};
var postgres = pgp(cn);
postgres.query(`CREATE TABLE  "comments" ${schema};`)
for(var i = 0; i < genres.length; i++){
  postgres.query(`CREATE TABLE  "${genres[i]}" ${schema};`)
}
}, 1000);
console.log('Successfully Created Database')

// postgres.commentsSection
//   .proc("version")
//   .then(data => {
//     console.log(
//       `Connected to ${data.version
//         .split(" ")
//         .slice(0, 4)
//         .join(" ")}`
//     );
//   })
//   .catch(error => {
//     console.log("Failed to connect to PostgreSQL");
//   });


// const AddMany = function(commentsArr, callback) {
//   // console.log("AddComment values Obj: ", valuesObj);
// };

// // const GetOneComment = function(commentId, callback) {
// //   console.log("called");
// //   return connection.query(
// //     "SELECT * FROM Comments WHERE id=" + commentId + ";",
// //     function(err, result, fields) {
// //       if (err) {
// //         callback(err);
// //       } else {
// //         callback(null, result);
// //       }
// //     }
// //   );
// // };

// const GetAllComments = function(callback) {
//   console.log("Called Get All");
//   return postgres.query("SELECT * FROM comments limit 50;");
// };
// module.exports = {
//   // AddMany
//   GetAllComments
//   // AddOne,
//   // GetOneComment
// };
