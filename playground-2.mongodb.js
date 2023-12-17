/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
// db.getCollection("sales2").insertMany([
//   { item: "abc", price: 15, quantity: 25 },
//   { item: "jkl", price: 20, quantity: 15 },
//   { item: "xyz", price: 15, quantity: 10 },
//   { item: "xyz", price: 5, quantity: 20 },
//   { item: "abc", price: 10, quantity: 15 }
// ]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales2').find().sort({ price: 1 });
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// Print a message to the output window.
console.log(salesOnApril4th);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales2').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { price: { $gte: 7.5, $lte: 15 } } },
  // Group the total sales for each product.
  //   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
