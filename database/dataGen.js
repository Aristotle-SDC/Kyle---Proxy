var faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./data.csv');

file.write(`textContent, dateCreated, username \n`);
for (let i = 0; i <= 10000000; i++) {
  file.write(
    `${faker.lorem.sentence()}, 
     ${faker.date
       .between(new Date('1986-12-17T03:24:00'), new Date())
       .toISOString()
       .split('.')
       .slice(0, 1)}, 
     ${faker.random
       .word()
       .split(' ')
       .slice(0, 1) + faker.random.number({ min: 1, max: 5000 })}\n`
  );
}
file.end();
console.log('DONE');
