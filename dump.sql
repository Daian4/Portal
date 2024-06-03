CREATE TABLE users (
	  id INTEGER primary key,
  	name varchar(150) not null,
  	email text not null unique,
  	phone text not null,
  	password text not null
  	
);

CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  user_id integer not null REFERENCES users(id),
  title VARCHAR(255) not null,
  description TEXT not null,
  status VARCHAR(50) not null,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  ticket_id INTEGER REFERENCES tickets(id),
  user_id INTEGER REFERENCES users(id),
  message TEXT not null,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);