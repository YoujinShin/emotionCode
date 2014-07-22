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
		surprise : String,//
		disapproval: String,//
		sadness : String,//
		remorse: String,//
		disgust: String,//
		contempt: String,//
		anger: String,//
		aggressiveness: String,//
		interest: String,//
		optimism: String,//
		joy: String,//
		love: String,//
		trust: String,//
		submission: String,
		fear: String
	},
	second : {
		surprise : String,
		disapproval: String,
		sadness : String,
		remorse: String,
		disgust: String,
		contempt: String,
		anger: String,
		aggressiveness: String,
		interest: String,
		optimism: String,
		joy: String,
		love: String,
		trust: String,
		submission: String,
		fear: String
	}
});

// export 'emoion' model
module.exports = mongoose.model('Emotion', EmotionSchema);

