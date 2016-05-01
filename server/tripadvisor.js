var mysql      = require('mysql');
var restify = require('restify');
var sanitizer = require('sanitizer');
var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'root',
  database  : 'LAHacks2016',
  port  : 3306
});

function test1(req, res, next) {
  console.log(req.params.amount);
  res.send("Hello 1");
  next();
}


function createUser (req, res, next) {
  console.log(req.params.password);

      var query = "SELECT * FROM Users WHERE email = " + mysql.escape(req.body.email) + ";"
      connection.query(query, function(err, results){
          if(results.length > 0) {
            res.send(401); //401 is user already exists
            next();
            return;
          }
          var query2 = "INSERT INTO Users (`name`, `email`, `password`) VALUES (" + mysql.escape(req.body.name) +","+mysql.escape(req.body.email)+ "," + mysql.escape(req.body.password) +");"
          connection.query(query2, function(err,results){
          if(err)
          throw err;
          res.send(200);
          next();
          return;
      });
      });
}



function createTrip (req, res, next) {
  console.log(req);
  var query = "SELECT id from Users WHERE email = " + mysql.escape(req.body.email) +";";
  connection.query(query,function(err, results) {
    if (results.length == 0)
    {
      res.send(403); //Invalid user email
      next();
      return;
    }
      var userid = results[0].id;
      console.log(userid);
      var query2 = "INSERT INTO Trips (userid, startdate, enddate, name) VALUES("+userid+"," + mysql.escape(req.body.startdate) +"," + mysql.escape(req.body.enddate) +"," + mysql.escape(req.body.name) + ");";
  connection.query(query2, function(err, results) {
      if(err) 
        res.send(400);
      res.send(200);
      next();
  });
});

}

function createDestination (req, res, next) {
var query1 = "SELECT id from Users where email = " + mysql.escape(req.body.email) +";";
connection.query(query1, function(err, results){
  if(results.length == 0)
  {
    res.send(403); //invalid user email
    next();
    return;
  }
  var userid = results[0].id;
  console.log(userid);

var query2 = "SELECT id from Trips where userid = " + userid + " AND name = " + mysql.escape(req.body.tripname) + ";";
connection.query(query2, function(err,results){
      if(results.length == 0)
      {
        res.send(404); //invalid trip name
        next();
        return;
      }
      var tripid = results[0].id;
      console.log(tripid);

      var query3 = "INSERT INTO Destinations (city, country, destName, startDate, endDate, rating, comments, userid, tripid) VALUES(" + mysql.escape(req.body.city) +"," + mysql.escape(req.body.country) +"," + mysql.escape(req.body.destName) +","+ mysql.escape(req.body.startdate) +","+ mysql.escape(req.body.enddate) +","+ mysql.escape(req.body.rating) +"," + mysql.escape(req.body.comments) +","+ userid + "," + tripid+ ");";
      console.log(query3);
      connection.query(query3, function(err, results) {
      if(err) 
        res.send(400);
      res.send(200);
      next();
  });
  });
});


}


var server = restify.createServer();
server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  });

server.use(restify.bodyParser ({mapParams: false}));


//server.get('/reports/create/:animal_type/:animal_notes', createReport);
//server.get('/users/create/:email/:org_id/:password', createUser);

server.post('/users', createUser);
server.post('/trips', createTrip);
server.post('/destinations', createDestination);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
