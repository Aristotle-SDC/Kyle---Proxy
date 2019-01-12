var pg = require('pg');
var format = require('pg-format');
const pool = new pg.Pool({
  user: 'root',
  host: '127.0.0.1',
  database: 'comments',
  password: '0000',
  port: '3003'
});

pool.query(
  'CREATE TABLE comments(idParentComment SERIAL PRIMARY KEY, textContent VARCHAR(120) NOT NULL, user VARCHAR(40) NOT NULL) ',
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);

const AddMany = function(commentsArr, callback) {
  // console.log("AddComment values Obj: ", valuesObj);
};
module.exports = {
  AddMany
  // GetAllComments,
  // AddOne,
  // GetOneComment
};
