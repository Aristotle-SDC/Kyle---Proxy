var faker = require('faker');
const db = require('../database');
var fakeArr =[] 

for (let i=0;i<=99;i++) {
	var fakeObj= {};
	fakeObj.textContent = faker.lorem.sentence();
	fakeObj.dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
	fakeObj.user = faker.random.word() + faker.random.number({min:1,max:999});
	fakeObj.idParentComment = 0;
	fakeArr.push(fakeObj);
}

//



var storeManyFakeData = function(commentArr) {
	db.AddMany(commentArr,
		(err,comment)=> {
			if (err) {console.log(err);throw err;}
			else {console.log('they got added');}
		}
	)
}

storeManyFakeData(fakeArr);

