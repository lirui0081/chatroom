import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
var enrouten = require('express-enrouten');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(enrouten({ directory: 'routes' }));


// catch 404 and forward to error handler
app.use(function (req: express.Request, res, next) {
    var err = new Error('Not Found');
    (<any>err).status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err: Error, req, res, next) {
        res.status((<any>err).status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err: Error, req, res, next) {
    res.status((<any>err).status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;