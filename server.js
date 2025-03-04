// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const { response } = require("express");
const express = require("express");
const lodash = require("lodash");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.get("/quotes/random", (req, res) => {
  res.json(lodash.sample(quotes));
});

app.get("/quotes/search", (req, res) => {
  const searchedWord = req.query.term;
  res.json(
    quotes.filter((entry) => {
      return (
        entry.quote.toLowerCase().includes(searchedWord.toLowerCase()) ||
        entry.author.toLowerCase().includes(searchedWord.toLowerCase())
      );
    })
  );
});

app.get("/quotes/echo", (req, res) => {
  const yourWord = req.query.word;
  res.json(`You said ${yourWord}!`);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
