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

var logger = require(SERVICES_PATH + '/logger/logger')(__filename);
var dbconnect = require(SERVICES_PATH + '/dbconnect/dbconnect');

var auth = require(SERVICES_PATH + '/auth');

//============= Create server ============

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(cookieParser());

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
		}
    }
});
app.engine('html', hbs.engine);
app.set('view engine', 'html');


// ============== ROUTES ================

app.get("/", function(req, res, next) {
	if (!req.session.uid) {
		res.redirect('/landing');
	} else {
		mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
			if (!err) {
				if (user) {
					res.render('main', {page: 'main', user: user});
				} else {
					/****/ logger.error('User not found by session uid ');
				}			
			} else {
				/****/ logger.error('Cannot find user cause DB error ' + err);
			}
		});
	}
});
app.get("/landing", function(req, res, next) {
	res.render('landing', {page: 'landing'});
});
app.get("/sign_up", function(req, res, next) {
	res.render('sign_up', {page: 'sign_up'});
});
app.post("/sign_up", function(req, res, next) {
	var ModelClass = mongoose.model('users');
	var model = new ModelClass(req.body);
	model.save(function(err) {
		if (!err) {
			req.session.uid = model.id;
			res.redirect('/');
		} else {
			/****/ logger.error('Cannot save user cause DB error ' + err);
		}
	});
});
app.get("/sign_in", function(req, res, next) {
	res.render('sign_in', {page: 'sign_in'});
});
app.post("/sign_in", function(req, res, next) {
	mongoose.model('users').findOne({email: req.body.email, pass: req.body.pass}, function(err, user) {
		if (!err) {
			if (user) {
				req.session.uid = user.get('id');
				res.redirect('/');
			} else {
				res.redirect('/sign_in');
			}			
		} else {
			/****/ logger.error('Cannot find user cause DB error ' + err);
		}
	})
});
app.get("/profile", function(req, res, next) {
	if (!req.session.uid) {
		res.redirect('/');
	} else {
		mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
			if (!err) {
				if (user) {
					res.render('profile', {page: 'profile', user: user});
				} else {
					/****/ logger.error('User not found by session uid ');
				}			
			} else {
				/****/ logger.error('Cannot find user cause DB error ' + err);
			}
		});
	}
});
app.post("/profile", function(req, res, next) {
	if (!req.session.uid) {
		res.redirect('/');
	} else {
		mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
			if (!err) {
				if (user) {
					if (!req.body.sport) {
						req.body.sport = undefined;
					}
					if (!req.body.pet) {
						req.body.pet = undefined;
					}
					if (!req.body.style) {
						req.body.style = undefined;
					}
					user.set(req.body);
					user.save(function(err) {
						if (!err) {
							res.redirect('/');
						} else {
							/****/ logger.error('Cannot save profile cause DB error ' + err);
						}
					});
				} else {
					/****/ logger.error('User not found by session uid ');
				}			
			} else {
				/****/ logger.error('Cannot find user cause DB error ' + err);
			}
		});
	}
});
app.get("/shopping_profile", function(req, res, next) {
	if (!req.session.uid) {
		res.redirect('/');
	} else {
		mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
			if (!err) {
				if (user) {
					res.render('shopping_profile', {page: 'shopping_profile', shoppingProfile: user.get('shoppingProfile') || {}});
				} else {
					/****/ logger.error('User not found by session uid ');
				}			
			} else {
				/****/ logger.error('Cannot find user cause DB error ' + err);
			}
		});
	}
});
app.post("/shopping_profile", function(req, res, next) {
	if (!req.session.uid) {
		res.redirect('/');
	} else {
		mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
			if (!err) {
				if (user) {
					console.log(req.body);
					user.set("shoppingProfile", req.body);
					user.save(function(err) {
						if (!err) {
							res.redirect('/');
						} else {
							/****/ logger.error('Cannot save profile cause DB error ' + err);
						}
					});
				} else {
					/****/ logger.error('User not found by session uid ');
				}			
			} else {
				/****/ logger.error('Cannot find user cause DB error ' + err);
			}
		});
	}
});


var server = app.listen(CONFIG.port);

// ============= Bootstrap models ==========

fs.readdirSync(join(BASE_PATH, 'server/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(BASE_PATH, 'server/models', file));
});

/****/ logger.info('Node app started on port ' + CONFIG.port);