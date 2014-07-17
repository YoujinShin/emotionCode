var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmotionSchema = new Schema({
	slug : { type: String, lowercase: true, required: true, unique: true },
	type : { type: String },
	properties : {
		reference : String,
		testdate : String,
		sourcetype: String,
		colilert: String,
		petrifilm_blue: String,
		petrifilm_red: String
		// petrifilm_red: Number
	}
});

// export 'emoion' model
module.exports = mongoose.model('Emotion', EmotionSchema);

