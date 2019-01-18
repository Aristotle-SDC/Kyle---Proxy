var faker = require("faker");
const fs = require("fs");

let counterfiles = 0;
let genre = null;
for (var j = 7; j > 2; j--) {
  if (j <= 10) genre = "country";
  if (j <= 9) genre = "rap";
  if (j <= 8) genre = "pop";
  if (j <= 7) genre = "rock";
  if (j <= 6) genre = "jazz";
  if (j <= 5) genre = "funk";
  if (j <= 4) genre = "blues";
  if (j <= 3) genre = "80's";
  if (j <= 2) genre = "metal";
  if (j <= 1) genre = "classical";

  const file = fs.createWriteStream(`./${j}.csv`);

  if (j === 1) {
    file.write(`songId, genre, textContent, dateCreated, username \n`);
  }

  for (let i = j * 1000000; i > (j - 1) * 1000000; i--) {
    let noComment = Math.floor(Math.random() * 6) + 1;
    let random = Math.floor(Math.random() * 4) + 1;
    if (noComment !== 1) {
      if (random === 1) {
        for (var k = Math.floor(Math.random() * 3) + 1; k > 0; k--) {
          file.write(
            `${i}, ${genre}, ${faker.lorem.sentence()}, ${faker.date
              .between(new Date("2018-11-17T03:24:00"), new Date())
              .toISOString()
              .split(".")
              .slice(0, 1)}, ${faker.random
              .word()
              .split(" ")
              .slice(0, 1) + faker.random.number({ min: 1, max: 5000 })}\n`
          );
        }
      } else {
        file.write(
          `${i}, ${genre}, ${faker.lorem.sentence()}, ${faker.date
            .between(new Date("2018-11-17T03:24:00"), new Date())
            .toISOString()
            .split(".")
            .slice(0, 1)}, ${faker.random
            .word()
            .split(" ")
            .slice(0, 1) + faker.random.number({ min: 1, max: 5000 })}\n`
        );
      }
    }
  }
  file.end();
  counterfiles++;
  console.log(`Finished generating ${counterfiles} files`);
}

console.log("Finished generating seed data");
