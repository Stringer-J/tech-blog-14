DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;

\c blog_db;

CREATE TABLE b_user (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(200) UNIQUE NOT NULL,
    pass VARCHAR(200) NOT NULL
);

CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    posted VARCHAR(300) NOT NULL,
    content VARCHAR(300) NOT NULL,
    user_id INTEGER NOT NULL
);