var assert = require('assert');
var request = require('request');
const chai =  require('chai');
const app = require('./server');
const chaiHttp = require('chai-http');
var should = chai.should();
const strFunc = require("./stringfile.js");
chai.use(chaiHttp);

describe('Test for Product of 2 numbers', function () {

  it('should be numbers', function(done) {
      chai.request(app)
          .get('/product?FirstNumber=3&SecondNumber=ab')
          .end(function(err, res){
            res.should.have.status(404);
            done();
          });
        });

  it('should be product of two numbers', function(done) {
      chai.request(app)
          .get('/product?FirstNumber=3&SecondNumber=9')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
        });

  it('should give status 404', function(done) {
      chai.request(app)
          .get('/product?FirstNumber=&SecondNumber=')
          .end(function(err, res){
           res.should.have.status(404);
           done();
         });
      });
});

describe("Writing into a file test", function(){

  it("should create a new file", function(done){
    chai.request(app)
        .get('/writefile?newdata=created new file successfully')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
  });
});

describe("String test",function(){
var value ;
var result;
  before(function () {
    value = 'Hello World String';
    result = strFunc.readString(value);
   });

    it('should find non repeating character',function(done) {
      chai.request(app)
          .get('/readstring?str=${value}')
          .end(function(err,res){
            res.should.have.status(200);
           done();
         });
    });
  });
