DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER (11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(100) NOT NULL, 
    price DECIMAL (7,2) NOT NULL, 
    stock_quantity INTEGER (4) NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Lavender Body Lotion", "Bath and Body", 6.75, 12), ("Bordeaux Fig and Vetiver Candle", "Aromatherapy Candles", 20.00, 14), ("Emerald and Vetiver Candle", "Aromatherapy Candles", 17.25, 8), ("Lavender Essential Bath Oil", "Bath and Body", 13.50, 5), ("Bath Mitt", "Personal Care", 5.25, 2), ("Pure Olive Oil Soap", "Bath and Body", 4.75, 8), ("Bath Bombs Variety Set", "Bathing Accessories", 18.95, 20), ("Body Brush", "Bathing Accessories", 9.95, 12), ("Ancient Minerals Magnesium Bath Flakes", "Bath and Body", 29.00, 10), ("Argan Oil", "Hair Care Products", 10.71, 15), ("Safe Sunscreen", "Sunscreen Products", 9.40, 5);

SELECT * FROM products; 