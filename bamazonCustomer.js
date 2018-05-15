var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "PublicUse",

  // Your password
  password: "WeakPass",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  fetchProducts();
});

function executeQuery(options, cb) {
  if(!options || !options.sql)
    throw (new Error('Invalid sql statement')); 
  db.query(options.sql, function (err, result, fields) {
              if (err) throw err;
              cb(result);
          });
}

function fetchProducts(res){
  var options = {
     sql : 'SELECT * FROM products'
  }
  executeQuery(options, function(result){
  res.write("<table>");
  res.write("<tr>");
  for(var column in result[0]){
      res.write("<td><label>" + column + "</label></td>");
  }
  res.write("</tr>");
  for(var row in result){
      res.write("<tr>");
      for(var column in result[row]){
          res.write("<td><label>" + result[row][column] + "</label></td>");       
      }
      res.write("</tr>");         
  }
  res.write("</table>");
});
}

