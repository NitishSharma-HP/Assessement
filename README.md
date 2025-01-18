for frontend:- 
npm install

for backend:- 
npm install


create a mysql database:-

CREATE DATABASE pincode_database;
USE pincode_database;
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch_type VARCHAR(100),
    delivery_status VARCHAR(30),
    district VARCHAR(50),
    region VARCHAR(50),
    state VARCHAR(30)
);

