var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  showTable();
});

//Function to show the table in the command line
function showTable () {
  connection.query("SELECT * FROM products", function (err, res) {
    var table = new Table({
    head: ['Item #', 'Product', 'Department', 'Price ($)', 'Available']
    , colWidths: [10, 40, 30, 13, 13]
    });
    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
  console.log(table.toString());
  forSale();
  });
};

//Function that starts the inquirer prompt
function forSale(){
  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "Which item would you like to purchase? Please enter the item number from the first column : ", 
        validate: function (input) {
          if (isNaN(input) === false && input !== '' && input <= 11)  {
            return true;
          } else {
            return false;
          }
        }
      },     
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function (input) {
          if (isNaN(input) === false && input !== '') {
            return true;
          } else {
          return false;
          }
        }
      }
    ]).then(function(promptResponse){
      var itemID = promptResponse.itemID;
      var quantity = promptResponse.quantity;
      
      var query = connection.query("SELECT * FROM products WHERE item_id=?",[itemID], function (err, res) {
        // console.log("The item search query is: " + query.sql);
        if (err) throw err;

        if (quantity > res[0].stock_quantity ) {
          console.log("Sorry, not enough of those items are available at the moment. Hope you can settle on something else!"); 
          forSale();
        } else {
          console.log("Your order has been received and will be fullfilled.");
          var userCost = quantity * res[0].price;
          console.log("The total cost to be charged to your account is: " + userCost.toFixed(2));
          var stockUpdate = res[0].stock_quantity - quantity;
          console.log("There are only " + stockUpdate + " left in stock - hurry back for more!")
          updateSQLtable(stockUpdate, itemID);
        }
      })
    });
  };

//Function to update the SQL table 
function updateSQLtable (stockUpdate, itemID) {
  console.log("Updating stock");
  var updateTable = ` 
  UPDATE products
  SET stock_quantity = ${stockUpdate}
  WHERE item_id = ${itemID};`;

  connection.query(updateTable, function (err, res) {
    connection.end();
  });
  console.log("Product updated!");
}
