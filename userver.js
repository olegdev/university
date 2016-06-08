GLOBAL.BASE_PATH = __dirname;
GLOBAL.SERVICES_PATH = __dirname + '/server/services';
GLOBAL.API_PATH = __dirname + '/server/api';
GLOBAL.CONFIG = require(BASE_PATH + '/server/util').getModuleConfig(__filename);

var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var https = require('https');
var fs = require('fs');
var join = require('path').join;
var fileUpload = require('express-fileupload');

var logger = require(SERVICES_PATH + '/logger/logger')(__filename);
var dbconnect = require(SERVICES_PATH + '/dbconnect/dbconnect');
var routes = require(SERVICES_PATH + '/routes');

//============= Create server ============

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(cookieParser());

app.use(fileUpload());

// =========== DB connect as middleware ===============

app.use(dbconnect);

//============= Session ============

var sessionMiddleware = session({
    secret: 'MHsession',
    saveUninitialized: true,
	resave: false,
    store: new MongoStore({
		mongooseConnection: mongoose.connection,
		autoReconnect: true,		
		collection: 'sessions',
		stringify: true,
		hash: false,
		ttl:  60 * 60 * 24 * 14, // 14 days
		autoRemove: 'native',
		autoRemoveInterval: 10,
    })
});

app.use(sessionMiddleware);

//============= Static ============

app.use(compression());
app.use(express.static(__dirname + '/client'));

//============= Template engine ============

var hbs = exphbs.create({
    defaultLayout: 'default',
    partialsDir: __dirname + '/views/partials',
    extname: '.html',
    helpers: {
    	ifCond: function (v1, operator, v2, options) {
		    switch (operator) {
		        case '==':
		            return (v1 == v2) ? options.fn(this) : options.inverse(this);
		        case '!=':
		            return (v1 != v2) ? options.fn(this) : options.inverse(this);
		        case '===':
		            return (v1 === v2) ? options.fn(this) : options.inverse(this);
		        case '<':
		            return (v1 < v2) ? options.fn(this) : options.inverse(this);
		        case '<=':
		            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		        case '>':
		            return (v1 > v2) ? options.fn(this) : options.inverse(this);
		        case '>=':
		            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		        case '&&':
		            return (v1 && v2) ? options.fn(this) : options.inverse(this);
		        case '||':
		            return (v1 || v2) ? options.fn(this) : options.inverse(this);
		        default:
		            return options.inverse(this);
		    }
		},
		ifContains: function() {
			var args = Array.prototype.slice.call(arguments);
			var v = args.shift();
			var options = arguments[arguments.length-1];
			return args.indexOf(v) != -1 ? options.fn(this) : options.inverse(this);
		},
		json: function(obj) {
			return JSON.stringify(obj);
		}
    }
});
app.engine('html', hbs.engine);
app.set('view engine', 'html');

routes.init(app);

var server = app.listen(CONFIG.port);

// ============= Bootstrap models ==========

fs.readdirSync(join(BASE_PATH, 'server/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(BASE_PATH, 'server/models', file));
});

/****/ logger.info('Node app started on port ' + CONFIG.port);