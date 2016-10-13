var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express_layouts = require('express-ejs-layouts');
var http = require('http');

var db_name = 'catfacts'
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  module.mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
else{
  module.mongodb_connection_string= 'mongodb://localhost/' + db_name;
}
module.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

var User = require('catfact-ecommerce').model


// declare app
var app = express();

// Static assets
app.use('/vendor/jquery',    express.static('node_modules/jquery/dist')); // redirect JS jQuery
app.use('/vendor/bootstrap',    express.static('node_modules/bootstrap/dist')); // redirect bootstrap JS
app.use('/vendor/font-awesome',   express.static('node_modules/font-awesome')); // redirect CSS bootstrap
app.use('/vendor/bootstrap-validator',   express.static('node_modules/bootstrap-validator/dist')); // redirect CSS bootstrap
app.use(express.static('assets'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // uncomment after placing your favicon in /public


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_layouts);
app.set('layout', 'layouts/layout');



// general app setup, logging, body, cookie parser, etc.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Site Variables
// Static Global
app.locals.config = require('./config');;

// Single request/response variables
app.use(function(req, res, next){
      res.locals.is_login = true;
      res.locals.app_root = __dirname;

      // Note the lean function is required to return a non-mongoose/pure JS object.
      User.findOne({username: 'Cierra.Hayes@gmail.com'}).then(function(user){
        res.locals.current_user = user
        next();
      })
})

// routes are located in the root/pages directory
app.use('/', require('./pages/routes'));

// Test Route
app.get('/', function(req, res) {
  console.log('This is a test page!');
  res.render('public/test', {my_root: app.locals.root});
});



// // Route Logic
// var routes = require('./routes/index');
// app.use('/', routes);




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });





// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


http.createServer(app).listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

