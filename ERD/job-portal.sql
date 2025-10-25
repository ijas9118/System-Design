CREATE TYPE user_role AS ENUM('client', 'freelancer', 'admin');

CREATE TYPE project_status AS ENUM('open', 'closed', 'completed');

CREATE TYPE payment_status AS ENUM('pending', 'completed', 'failed');

CREATE TABLE
  users (
    user_id serial PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD VARCHAR(100) NOT NULL,
    ROLE user_role NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  project (
    project_id serial PRIMARY KEY,
    client_id INT REFERENCES USER(user_id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    budget NUMERIC(10, 2) NOT NULL,
    status project_status NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  bid (
    bid_id serial PRIMARY KEY,
    project_id INT REFERENCES Project (project_id),
    freelancer_id INT REFERENCES USER(user_id),
    bid_amount NUMERIC(10, 2) NOT NULL,
    bid_date date NOT NULL,
    proposal TEXT NOT NULL,
    is_accepted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  payment (
    payment_id serial PRIMARY KEY,
    project_id INT REFERENCES Project (project_id),
    freelancer_id INT REFERENCES USER(user_id),
    amount NUMERIC(10, 2) NOT NULL,
    payment_date date NOT NULL,
    status payment_status NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );