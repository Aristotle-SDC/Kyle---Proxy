DROP DATABASE IF EXISTS commentSection;
CREATE DATABASE commentSection;
use commentSection;




CREATE TABLE Comments (
	id int NOT NULL AUTO_INCREMENT,
	textContent varchar(200) NOT NULL,
	dateCreated DATETIME NOT NULL,
	user varchar(75) NOT NULL,
	idParentComment int NULL,
	PRIMARY KEY (id)
);