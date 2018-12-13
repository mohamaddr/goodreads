var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String }
});

userSchema.post('remove', function(doc) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
	Review.findOne({user: doc._id}, function(rev) {
		Review.remove(rev).exec();
	});
});

module.exports = mongoose.model('users', userSchema);
