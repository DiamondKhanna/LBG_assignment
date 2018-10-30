var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require('http');
const fs = require('fs');
const strFile = require("./stringfile.js");
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/product',function(req,res){
    let first = req.query.FirstNumber;
    let second = req.query.SecondNumber;

    const product = first * second;

    if(!product || isNaN(first) || isNaN(second)){
        res.sendStatus(404);
        res.end("Not found");
    }
    else{
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("The product of two numbers is:" + product);
    }
});

app.get('/writefile',function(req,res){

    var new_data = req.query.newdata;

    fs.writeFile('outputfile.txt',new_data, (err) => {
        if(err){
          res.end(err);
         }
         else{
             res.statusCode = 200;
             res.end("File saved successfully as outputfile.txt");
         }
       });
})

app.get('/readstring',function(req,res){
    var string = req.query.str;

     const result = strFile.readString(string);
     res.send(result);
})

server.listen(3001,function(){
    console.log("Server listening on port 3001");
});

module.exports = server;
