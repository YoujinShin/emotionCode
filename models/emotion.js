var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmotionSchema = new Schema({
	slug : { type: String, lowercase: true, required: true, unique: true },
	name : String,
	properties : {
		surprise : String,
		sadness : String,
		fear: String,
		anger: String,
		disgust: String,
		serenity: String,
		happiness: String,
		freedom: String
		// petrifilm_red: Number
	}
});

// export 'emoion' model
module.exports = mongoose.model('Emotion', EmotionSchema);

