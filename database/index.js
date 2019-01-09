const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const Blue = require('bluebird');

const connection = mysql.createConnection(mysqlConfig);




const AddMany = function(commentsArr,callback) {
  // console.log("AddComment values Obj: ", valuesObj);
  var promiseArray = commentsArr.map((data,i) => {
  	return new Blue( (resolve,reject) => {
  		connection.query(
		    "INSERT INTO Comments (textContent, dateCreated,user,idParentComment) VALUES ('"+data.textContent+"', '"+data.dateCreated.toString()+"', '"+data.user+"', '"+data.idParentComment+"')",
		    function (err, result, fields) {
		      if (err) {callback(err)}
		      else {
		      	console.log('insert#: ',i);
		      	callback(null,result)
		      }
		    })
  	})
		  


	})
	Blue.all(promiseArray).then(result =>{
		connection.commit();
		//connect.end(); // connection.end()?
		}
	);
}

const GetAllComments = function(callback) {
  return connection.query("SELECT * FROM Comments;",function (err, result, fields) {
    if (err) {
    	callback(err)
    }
    else {
    	callback(null,result)
    }
  })
};

const AddOne = function(comment,callback) {
	return connection.query(
		"INSERT INTO Comments (textContent, dateCreated,user,idParentComment) VALUES ('"+comment.textContent+"', '"+comment.dateCreated.toString()+"', '"+comment.user+"', '"+comment.idParentComment+"')",
		function (err,result,fields) {
			if (err) {console.log('DB.AddOne error callback: ');callback(err);}
			else {callback(null,result)}
		}
	)
}


const GetOneComment = function(commentId,callback) {
	return connection.query("SELECT * FROM Comments WHERE id="+commentId+";",function (err, result, fields) {
    if (err) {
    	callback(err)
    }
    else {
    	callback(null,result)
    }
  })
}


module.exports = {
	AddMany,
	GetAllComments,
	AddOne,
	GetOneComment
};