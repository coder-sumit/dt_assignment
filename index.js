const express = require('express');
const app = express();
var bodyParser = require('body-parser') 
const PORT = 5000;

// to access form data
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/', require('./routes'));
// access upoads
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(PORT, function(err){
   if(err){
    console.log(err);
   }
   console.log("Yup! Server is Up and Running on Port:", PORT);
});