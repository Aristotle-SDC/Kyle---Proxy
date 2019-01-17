const fs = require('fs');
const file = fs.createWriteStream(`./createDB.sql`);
const genres = ['classical', 'country', 'metal', '80s', 'blues', 'funk', 'jazz', 'rock', 'pop', 'rap']

 for(var i = 0; i < genres.length; i++){
    file.write(`CREATE TABLE ${genres[i]} (
    "id" serial PRIMARY KEY,
    "songId" int NOT NULL,
    "genre" VARCHAR(20) NOT NULL,
    "textContent" VARCHAR(200) NOT NULL,
    "dateCreated" date NOT NULL,
    "username" VARCHAR(100) NOT NULL
)
\n`)

    }
    console.log('done')