var profilesService = require(SERVICES_PATH + '/profiles');
var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = {

	normalize: function(user, data, callback) {
		user.set(data);

		// profiles 

		user.profiles = {};
		var profileList = ['shopping', 'professional'];
		if (user.additional_profiles) {
			profileList = profileList.concat(user.additional_profiles);
		}
		profileList.forEach(function(v) {
			user.profiles[v] = profilesService.factory(v, {photo: "img/ava_" + user.avatar + ".png"})
		});

		// public url

		if (!user.publicName) {
			this.genPublicName(user, function() {
				callback(user);
			});
		} else {
			callback(user);
		}
	},

	genPublicName: function(user, callback) {
		var genInner = function(counter) {
			var publicName = user.firstName + ' ' + user.lastName + (counter ? counter : '');
			publicName = publicName.replace(/\s+/g, '.').toLowerCase();

			mongoose.model('users').findOne({publicName: publicName}, function(err, doc) {
				if (!err) {
					if (doc) {
						genInner(counter + 1);
					} else {
						user.set({publicName: publicName});
						callback();
					}
				}
			});		
		}

		genInner(0);
	}

}