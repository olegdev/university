var logger = require(SERVICES_PATH + '/logger/logger')(__filename);
var profilesService = require(SERVICES_PATH + '/profiles');
var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = {
	init: function(app) {

		// ---------------- Main page -----------------------

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

		// ----------------- Logout -----------------------

		app.get("/logout", function(req, res, next) {
			req.session.destroy()
			res.redirect('/');
		});

		// ----------------- landing page -----------------------

		app.get("/landing", function(req, res, next) {
			res.render('landing', {page: 'landing'});
		});

		// ------------------- Sign up ---------------------------

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

		// ------------------- Sign in --------------------------

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

		// ------------------- Account page -----------------------

		app.get("/account", function(req, res, next) {
			if (!req.session.uid) {
				res.redirect('/');
			} else {
				mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
					if (!err) {
						if (user) {
							res.render('account', {page: 'account', user: user});
						} else {
							/****/ logger.error('User not found by session uid ');
						}			
					} else {
						/****/ logger.error('Cannot find user cause DB error ' + err);
					}
				});
			}
		});
		app.post("/account", function(req, res, next) {
			if (!req.session.uid) {
				res.redirect('/');
			} else {
				mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
					if (!err) {
						if (user) {
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

		// -------------------- Profile --------------------------

		app.get("/profile", function(req, res, next) {
			if (!req.session.uid) {
				res.redirect('/');
			} else {
				mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
					if (!err) {
						if (user) {
							var type = req.query.type || 'shopping',
								profiles = user.get('profiles') || {},
								profile = profiles[type] || profilesService.factory(type),
								page = 'basic_profile';

							profilesService.normalize(type, profile);

							if (type == 'shopping' || type == 'professional') {
								page = type + '_profile';
							}
							res.render(page, {page: 'profile', profile: profile});
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
							console.log(req.body);

							var type = req.query.type,
								profiles = _.extend({}, user.get('profiles') || {});

							if (req.body.connections) {
								if (typeof req.body.connections == 'string') {
									req.body.connections = [req.body.connections];
								}
							} else {
								req.body.connections = [];
							}

							profiles[type] = profilesService.normalize(type, req.body);

							user.profiles = profiles;
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

		// ---------------------------- Upload -----------------------

		app.post("/upload", function(req, res, next) {
			if (!req.session.uid) {
				res.redirect('/');
			} else {
				mongoose.model('users').findOne({_id: req.session.uid}, function(err, user) {
					if (!err) {
						if (user) {

							if (req.files && req.files.file) {
								var fileName = user._id + '_' + new Date().getTime() + '.jpg';
								req.files.file.mv(BASE_PATH + '/client/img/uploads/' + fileName, function(err) {
									if (!err) {
										res.send('/img/uploads/' + fileName);
									} else {
										res.status(500).send(err);
									}
								});
							} else {
								/****/ logger.error('File not found');	
							}
						} else {
							/****/ logger.error('User not found by session uid ');
						}			
					} else {
						/****/ logger.error('Cannot find user cause DB error ' + err);
					}
				});
			}
		});	

		// -------------------- Connections --------------------------

		app.get("/connections", function(req, res, next) {
			if (!req.session.uid) {
				res.redirect('/');
			} else {
				var type = req.query.type;
				var conditions = {};
				conditions["profiles." + type] = {$exists: true};
				mongoose.model('users').find(conditions, function(err, docs) {
					if (!err) {
						var resp = {};
						docs.forEach(function(doc) {
							if (doc._id != req.session.uid) {
								resp[doc._id] = {
									id: doc._id,
									firstName: doc.firstName,
									lastName: doc.lastName,
									photo: doc.profiles[type].photo,
								};
							}
						});	
						res.send(resp);
					} else {
						/****/ logger.error('Cannot find user cause DB error ' + err);
					}
				});
			}
		});

	}
}