CREATE DATABASE IF NOT EXISTS emergydb;

USE emergybdb;

CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	number VARCHAR(20) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE incident (
	incident_id INT NOT NULL AUTO_INCREMENT,
	date VARCHAR(50),
	mayorIncident TINYINT(1),
	location VARCHAR(200),
	type VARCHAR(50),
	hazard VARCHAR(1000),
	access VARCHAR(1000),
	casualtiesDescription VARCHAR(1000),
	adults INT,
	children INT,
	fatalities INT,
	servicesDescription VARCHAR(1000),
	sanitary INT,
	firefighting INT,
	rescue INT,
	user_name VARCHAR(50),
	user_email VARCHAR(50),
	PRIMARY KEY (incident_id)
);

CREATE TABLE contact (
	contact_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	number VARCHAR(20) NOT NULL,
	email VARCHAR(100),
	PRIMARY KEY (contact_id),
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE emergency_manuals (
	manual_id INT NOT NULL AUTO_INCREMENT,
    emergency_manual json,
	PRIMARY KEY (manual_id)
);

CREATE TABLE type_of_hazard (
	hazard_id INT NOT NULL AUTO_INCREMENT,
	hazard_name VARCHAR(50) NOT NULL,
	PRIMARY KEY (hazard_id)
);

CREATE TABLE type_of_incident (
	incident_type_id INT NOT NULL AUTO_INCREMENT,
	incident_type_section TINYINT(1),
	incident_type_label VARCHAR(50) NOT NULL,
	PRIMARY KEY (incident_type_id)
);
