var path = require('path');
const express = require("express");
const app = express();

module.exports = function(app) {
  
    app //route to notes.html, returns the notes.html file
        .route('/notes')
        .get((req, res) =>{ res.sendFile(path.join(__dirname, '../public/notes.html'))})
  
    app // default route which leads to index.html if no other matching path is found, returns the index.html file to the browser
        .route('*')
        .get((req, res) => { res.sendFile(path.join(__dirname, '../public/index.html'))});

}