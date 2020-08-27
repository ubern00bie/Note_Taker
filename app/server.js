//required modules and paths
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
require("./routing/api-routes")(app); 
require("./routing/html-routes")(app); 

const PORT = process.env.PORT || 3000; //set port to listen on, allow port variable to be set by whomever hosts the app


app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT);
})
