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

		if (!user.publicUrl) {
			this.genPublicUrl(user, function() {
				callback(user);
			});
		} else {
			callback(user);
		}
	},

	genPublicUrl: function(user, callback) {
		var genInner = function(counter) {
			var publicUrl = user.firstName + ' ' + user.lastName + (counter ? counter : '');
			publicUrl = publicUrl.replace(/\s/g, '_');

			mongoose.model('users').findOne({publicUrl: publicUrl}, function(err, doc) {
				if (!err) {
					if (doc) {
						genInner(counter + 1);
					} else {
						user.set({publicUrl: publicUrl});
						callback();
					}
				}
			});		
		}

		genInner(0);
	}

}