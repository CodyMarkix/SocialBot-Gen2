// Importing libraries
const fs = require("fs");
const path = require("path");
const express = require('express');

// Express app so that this thing can run 24/7
const app = express();
const exprport = 3000;

app.use(express.static('website'));

app.get('/', function (req, res) {
    res.send(path.resolve(__dirname, "website", "index.html")); // Redirect to the index html
});

app.listen(exprport, () => {
    console.log(`Social Bot listening at http://localhost:${exprport}`);
});
