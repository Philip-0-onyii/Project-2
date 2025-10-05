-- Simple Inventory Management Database (Made by a Student)

-- Create Database
CREATE DATABASE inventory_system;
USE inventory_system;

-- 1. USERS TABLE
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role ENUM('admin', 'user') DEFAULT 'user'
);

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 3. ITEMS TABLE
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  size ENUM('s','m','l'),
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 4. ORDERS TABLE
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  quantity INT DEFAULT 1,
  status ENUM('pending','approved','disapproved') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- INSERTING RECORDS
INSERT INTO users (first_name, last_name, email, password, role)
VALUES
('John', 'Doe', 'john@example.com', 'pass123', 'admin'),
('Mary', 'Smith', 'mary@example.com', 'pass456', 'user');

INSERT INTO categories (name)
VALUES ('Electronics'), ('Clothing'), ('Stationery');

INSERT INTO items (name, price, size, category_id)
VALUES
('Laptop', 500.00, 'm', 1),
('T-Shirt', 15.00, 's', 2),
('Notebook', 2.50, 'l', 3);

INSERT INTO orders (user_id, item_id, quantity)
VALUES
(2, 1, 1),
(2, 3, 5);

-- READING RECORDS
SELECT * FROM users;

SELECT items.name AS item_name, categories.name AS category_name
FROM items
JOIN categories ON items.category_id = categories.id;

SELECT orders.id, users.first_name, items.name AS item_name, orders.status
FROM orders
JOIN users ON orders.user_id = users.id
JOIN items ON orders.item_id = items.id;

-- UPDATING RECORDS
UPDATE orders SET status = 'approved' WHERE id = 1;
UPDATE items SET price = 550.00 WHERE name = 'Laptop';

-- DELETING RECORDS
DELETE FROM items WHERE id = 3;
DELETE FROM users WHERE id = 2;

-- USING JOINS
SELECT users.first_name, users.last_name, items.name AS item_name, orders.status
FROM orders
JOIN users ON orders.user_id = users.id
JOIN items ON orders.item_id = items.id
WHERE orders.status = 'approved';
