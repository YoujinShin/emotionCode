var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var EmotionSchema = new Schema({
// 	slug : { type: String, lowercase: true, required: true, unique: true },
// 	name : String,
// 	state : String,
// 	properties : {
// 		surprise : String,
// 		sadness : String,
// 		fear: String,
// 		anger: String,
// 		disgust: String,
// 		serenity: String,
// 		happiness: String,
// 		freedom: String
// 		// petrifilm_red: Number
// 	}
// });

var EmotionSchema = new Schema({
	slug : { type: String, lowercase: true, required: true, unique: true },
	name : String,
	state : String,
	first : {
		surprise : String,
		sadness : String,
		fear: String,
		anger: String,
		disgust: String,
		serenity: String,
		happiness: String,
		freedom: String
	},
	second : {
		surprise : String,
		sadness : String,
		fear: String,
		anger: String,
		disgust: String,
		serenity: String,
		happiness: String,
		freedom: String
	}
});

// export 'emoion' model
module.exports = mongoose.model('Emotion', EmotionSchema);

