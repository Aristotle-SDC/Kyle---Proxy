const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const db = require('../database');
const pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
const Sequelize = require('sequelize');
const app = express();
const PORT = 3003;
var copyFrom = require('pg-copy-streams').from;
// const pool = new Pool();
// var stream = client.query(copyFrom('COPY comments FROM STDIN'));
var fileStream = fs.createReadStream('seeds.csv');
const sequelize = new Sequelize('comments', 'root', '0000', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const comments = sequelize.define(
  'comments',
  {
    textContent: {
      type: Sequelize.STRING
    },
    dateCreated: {
      type: Sequelize.DATE
    }
  },
  {
    user: Sequelize.STRING
  }
);
sequelize.authenticate().then(() => {
  console.log('Postgres Connection has been established successfully.');
});
sequelize
  .sync({ force: true })
  .then(() => {
    comments.create({
      textContent: 'Getting Started with PostgreSQL and Sequelize',
      dateCreated: new Date(),
      user: 'test'
    });

    comments.query('COPY comments seeds.csv');

    comments
      .findAll({})
      .then(data => {
        console.log('DATA=', data);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the postgres database:', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));

app.get('/api/comments', (req, res) => {
  db.GetAllComments((err, comments) => {
    if (err) {
      throw err;
    } else {
      res.send(comments);
    }
  });
});

// app.get('/api/singleComment', (req,res) => {
// 	console.log("comment id: ",req.query);
// 	db.GetOneComment(req.query.commentId,
// 		(err,comment) => {
// 			if (err) {throw err}
// 			else {res.send(comment)}
// 		}
// 	);
// })

// app.post('/api/comments', (req,res) => {
// 	db.AddOne(req.body,
// 		(err,comment) => {
// 			if (err) {console.log('error in express');throw err;}
// 			else {
// 				console.log(comment);
// 				res.send(200,comment.insertId)}
// 				// ^ Send insertId to client
// 				// so that client can automatically add the correct comment
// 		}
// 	)
// })

app.listen(PORT, () => {
  console.log(`Server running on Localhost:${PORT}`);
});
