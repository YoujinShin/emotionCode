/*
 * routes/index.js
 * Routes contains the functions (callbacks) associated with request urls.
 */

var request = require('request'); // library to make requests to remote urls
var moment = require("moment"); // date manipulation library
var emotionModel = require("../models/emotion.js"); //db model

exports.index = function(req, res) {
	console.log("main page requested");
	res.render('index2.html');
}

exports.checkState = function(req, res) {
	console.log("checkState page requested");
	console.log( req.body );

	if(req.body.name === "") {
		console.log("wrong name");
	} else {
		var name = req.body.name;
		var emotion_id = req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_');
		var emotionQuery = emotionModel.findOne({slug:emotion_id}); 

		emotionQuery.exec(function(err, currentEmotion){
			if (err) {
				return res.status(500).send("There was an error on query");
			}
			if (currentEmotion == null) {
				var templateData = {
					name : req.body.name
				}
				console.log("Not find emotion");
				console.log("render firstEmotion");
				res.render('firstEmotion.html', templateData);
			} else {
				console.log("Found emotion");
				console.log(currentEmotion);

				var templateData = {
					emotion : currentEmotion
				}

				if(currentEmotion.state == "primary") {
					console.log("Create second emotion");
					res.redirect('/secondEmotion/' + emotion_id);
				} else if(currentEmotion.state == "aspirational") {
					res.redirect('/aspirationalCode/' + emotion_id);
					// res.render('aspirationalCode.html', templateData);
				}	
			}		
		});
	}
}

exports.createFirstEmotion = function(req, res) {
	console.log("createFirstEmotion requested");
	var date = moment(this.date), formatted = date.format('YY[-]MM[-]DD[_]HH[:]mm[:]ss[_]');

	var surpriseV, disapprovalV, sadnessV, remorseV, disgustV, contemptV, angerV,
	aggressivenessV, interestV, optimismV, joyV, loveV, trustV, submissionV, fearV;
	if( req.body.surprise == null) { surpriseV = 0;} else { surpriseV = 1 ;}
	if( req.body.disapproval == null) { disapprovalV = 0;} else { disapprovalV = 1 ;}
	if( req.body.sadness == null) {  sadnessV = 0;} else { sadnessV = 1 ;}
	if( req.body.remorse == null) {  remorseV = 0;} else { remorseV = 1 ;}
	if( req.body.disgust == null) {  disgustV = 0;} else { disgustV = 1 ;}
	if( req.body.contempt == null) {  contemptV = 0;} else { contemptV = 1 ;}
	if( req.body.anger == null) {  angerV = 0;} else { angerV = 1 ;}
	if( req.body.aggressiveness == null) {  aggressivenessV = 0;} else { aggressivenessV = 1 ;}
	if( req.body.interest == null) {  interestV = 0;} else { interestV = 1 ;}
	if( req.body.optimism == null) {  optimismV = 0;} else { optimismV = 1 ;}
	if( req.body.joy == null) {  joyV = 0;} else { joyV = 1 ;}
	if( req.body.love == null) {  loveV = 0;} else { loveV = 1 ;}
	if( req.body.trust == null) {  trustV = 0;} else { trustV = 1 ;}
	if( req.body.submission == null) {  submissionV = 0;} else { submissionV = 1 ;}
	if( req.body.fear == null) {  fearV = 0;} else { fearV = 1 ;}
 
	var newEmotion = new emotionModel({
		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'),
		name : req.body.name,
		state : req.body.state,
		first : {
			surprise : surpriseV,//
			disapproval: disapprovalV,//
			sadness : sadnessV,//
			remorse: remorseV,//
			disgust: disgustV,//
			contempt: contemptV,//
			anger: angerV,//
			aggressiveness: aggressivenessV,//
			interest: interestV,//
			optimism: optimismV,//
			joy: joyV,//
			love: loveV,//
			trust: trustV,//
			submission: submissionV,
			fear: fearV
		}
	});

	newEmotion.save(function(err){
		if (err) {
			console.error("Error on saving new emotion data");
			console.error(err); // log out to Terminal all errors
		} else {
			console.log("Created a new emotion!");
			console.log(newEmotion);
			res.redirect('/primaryCode/' + newEmotion.slug);
		}
	});
}

exports.primaryCode = function(req, res) {
	console.log("primaryCode page requested for " + req.params.emotion_id);
	var emotion_id = req.params.emotion_id; 
	var emotionQuery = emotionModel.findOne({slug:emotion_id}); 
	
	emotionQuery.exec(function(err, currentEmotion){
		if (err) {
			return res.status(500).send("There was an error on the quality query");
		}
		if (currentEmotion == null) {
			return res.status(404).render('404.html');
		}
		console.log("Found emotion");
		console.log(currentEmotion);

		var templateData = {
			emotion : currentEmotion
		}

		res.render('primaryCode.html', templateData);
	});
}

exports.secondEmotion = function(req, res) {
	console.log("secondEmotion page requested for " + req.params.emotion_id);
	var emotion_id = req.params.emotion_id; 
	var emotionQuery = emotionModel.findOne({slug:emotion_id}); 

	emotionQuery.exec(function(err, currentEmotion){
		if (err) {
			return res.status(500).send("There was an error on the quality query");
		}
		if (currentEmotion == null) {
			return res.status(404).render('404.html');
		}
		console.log("Found primary emotion");
		console.log(currentEmotion);

		var templateData = {
			emotion : currentEmotion
		}
		res.render('secondEmotion.html', templateData);
	});
}

exports.createSecondEmotion = function(req, res) {
	console.log("createSecondEmotion requested");
	var emotion_id = req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'); 
	var emotionQuery = emotionModel.findOne({slug:emotion_id}); 

	var surpriseV, disapprovalV, sadnessV, remorseV, disgustV, contemptV, angerV,
	aggressivenessV, interestV, optimismV, joyV, loveV, trustV, submissionV, fearV;
	if( req.body.surprise == null) { surpriseV = 0;} else { surpriseV = 1 ;}
	if( req.body.disapproval == null) { disapprovalV = 0;} else { disapprovalV = 1 ;}
	if( req.body.sadness == null) {  sadnessV = 0;} else { sadnessV = 1 ;}
	if( req.body.remorse == null) {  remorseV = 0;} else { remorseV = 1 ;}
	if( req.body.disgust == null) {  disgustV = 0;} else { disgustV = 1 ;}
	if( req.body.contempt == null) {  contemptV = 0;} else { contemptV = 1 ;}
	if( req.body.anger == null) {  angerV = 0;} else { angerV = 1 ;}
	if( req.body.aggressiveness == null) {  aggressivenessV = 0;} else { aggressivenessV = 1 ;}
	if( req.body.interest == null) {  interestV = 0;} else { interestV = 1 ;}
	if( req.body.optimism == null) {  optimismV = 0;} else { optimismV = 1 ;}
	if( req.body.joy == null) {  joyV = 0;} else { joyV = 1 ;}
	if( req.body.love == null) {  loveV = 0;} else { loveV = 1 ;}
	if( req.body.trust == null) {  trustV = 0;} else { trustV = 1 ;}
	if( req.body.submission == null) {  submissionV = 0;} else { submissionV = 1 ;}
	if( req.body.fear == null) {  fearV = 0;} else { fearV = 1 ;}
 
	var updatedData = {
		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'),
		name : req.body.name,
		state : req.body.state,
		second : {
			surprise : surpriseV,//
			disapproval: disapprovalV,//
			sadness : sadnessV,//
			remorse: remorseV,//
			disgust: disgustV,//
			contempt: contemptV,//
			anger: angerV,//
			aggressiveness: aggressivenessV,//
			interest: interestV,//
			optimism: optimismV,//
			joy: joyV,//
			love: loveV,//
			trust: trustV,//
			submission: submissionV,
			fear: fearV
		}
	};

	emotionModel.update({slug:emotion_id}, { $set: updatedData}, function(err, emotion){
		if (err) {
			console.error("ERROR: While updating");
			console.error(err);			
		}
		if (emotion != null) {
			console.log("updated data");
			console.log(emotion);
			res.redirect('/aspirationalCode/' + emotion_id);
		} else {
			console.error("unable to find emotion: " + emotion_id);
			return res.status(404).render('404.html');
		}
	})
}

exports.aspirationalCode = function(req, res) {
	console.log("aspirationalCode page requested for " + req.params.emotion_id);
	var emotion_id = req.params.emotion_id; 
	var emotionQuery = emotionModel.findOne({slug:emotion_id}); 
	
	emotionQuery.exec(function(err, currentEmotion){
		if (err) {
			return res.status(500).send("There was an error on the quality query");
		}
		if (currentEmotion == null) {
			return res.status(404).render('404.html');
		}
		console.log("Found aspirational code");
		console.log(currentEmotion);

		var templateData = {
			emotion : currentEmotion
		}

		res.render('aspirationalCode.html', templateData);
	});
}

// exports.secondEmotionCode = function(req, res) {
// 	console.log("secondEmotionCode page requested");
// 	res.render("secondEmotionCode.html");
// }

// exports.view = function(req, res) {
// 	console.log("view page requested");
// 	res.render("viewEmotionCode.html");
// }

exports.allEmotion = function(req, res) { 
	console.log("all emotion data retrieved");
	emotionQuery = emotionModel.find({}); // query for all emotion

	emotionQuery.exec(function(err, allEmotion){
		// prepare data for JSON
		var jsonData = {
			status : 'OK',
			quality : allEmotion
		}
		res.json(jsonData);
	});
}


// /*
// 	GET /
// */
// exports.index = function(req, res) {
	
// 	console.log("main page requested");

// 	// query for all astronauts
// 	// .find will accept 3 arguments
// 	// 1) an object for filtering {} (empty here)
// 	// 2) a string of properties to be return, 'name slug source' will return only the name, slug and source returned astronauts
// 	// 3) callback function with (err, results)
// 	//    err will include any error that occurred
// 	//	  allAstros is our resulting array of astronauts
// 	astronautModel.find({}, 'name slug source', function(err, allAstros){

// 		if (err) {
// 			res.send("Unable to query database for astronauts").status(500);
// 		};

// 		console.log("retrieved " + allAstros.length + " astronauts from database");

// 		//build and render template
// 		var templateData = {
// 			astros : allAstros,
// 			pageTitle : "NASA Astronauts (" + allAstros.length + ")"
// 		}

// 		res.render('index.html', templateData);

// 	});

// }

// exports.data_all = function(req, res) {

// 	astroQuery = astronautModel.find({}); // query for all astronauts
// 	astroQuery.sort('-birthdate');
	
// 	// display only 3 fields from astronaut data
// 	astroQuery.select('name photo birthdate');
	
// 	astroQuery.exec(function(err, allAstros){
// 		// prepare data for JSON
// 		var jsonData = {
// 			status : 'OK',
// 			astros : allAstros
			
// 		}

// 		res.json(jsonData);
// 	});

// }

// /*
// 	GET /astronauts/:astro_id
// */
// exports.detail = function(req, res) {

// 	console.log("detail page requested for " + req.params.astro_id);

// 	//get the requested astronaut by the param on the url :astro_id
// 	var astro_id = req.params.astro_id;

// 	// query the database for astronaut
// 	var astroQuery = astronautModel.findOne({slug:astro_id});
// 	astroQuery.exec(function(err, currentAstronaut){

// 		if (err) {
// 			return res.status(500).send("There was an error on the astronaut query");
// 		}

// 		if (currentAstronaut == null) {
// 			return res.status(404).render('404.html');
// 		}

// 		console.log("Found astro");
// 		console.log(currentAstronaut.name);

// 		// formattedBirthdate function for currentAstronaut
// 		currentAstronaut.formattedBirthdate = function() {
// 			// formatting a JS date with moment
// 			// http://momentjs.com/docs/#/displaying/format/
//             return moment(this.birthdate).format("dddd, MMMM Do YYYY");
//         };
		
// 		//query for all astronauts, return only name and slug
// 		astronautModel.find({}, 'name slug', function(err, allAstros){

// 			console.log("retrieved all astronauts : " + allAstros.length);

// 			//prepare template data for view
// 			var templateData = {
// 				astro : currentAstronaut,
// 				astros : allAstros,
// 				pageTitle : currentAstronaut.name
// 			}

// 			// render and return the template
// 			res.render('detail.html', templateData);


// 		}) // end of .find (all) query
		
// 	}); // end of .findOne query

// }

// exports.data_detail = function(req, res) {

// 	console.log("detail page requested for " + req.params.astro_id);

// 	//get the requested astronaut by the param on the url :astro_id
// 	var astro_id = req.params.astro_id;

// 	// query the database for astronaut
// 	var astroQuery = astronautModel.findOne({slug:astro_id});
// 	astroQuery.exec(function(err, currentAstronaut){

// 		if (err) {
// 			return res.status(500).send("There was an error on the astronaut query");
// 		}

// 		if (currentAstronaut == null) {
// 			return res.status(404).render('404.html');
// 		}


// 		// formattedBirthdate function for currentAstronaut
// 		currentAstronaut.formattedBirthdate = function() {
// 			// formatting a JS date with moment
// 			// http://momentjs.com/docs/#/displaying/format/
//             return moment(this.birthdate).format("dddd, MMMM Do YYYY");
//         };
		
// 		//prepare JSON data for response
// 		var jsonData = {
// 			astro : currentAstronaut,
// 			status : 'OK'
// 		}

// 		// return JSON to requestor
// 		res.json(jsonData);

// 	}); // end of .findOne query

// }

// /*
// 	GET /create
// */
// exports.astroForm = function(req, res){

// 	var templateData = {
// 		page_title : 'Enlist a new astronaut'
// 	};

// 	res.render('create_form.html', templateData);
// }

// /*
// 	POST /create
// */
// exports.createAstro = function(req, res) {
	
// 	console.log("received form submission");
// 	console.log(req.body);

// 	// accept form post data
// 	var newAstro = new astronautModel({
// 		name : req.body.name,
// 		photo : req.body.photoUrl,
// 		source : {
// 			name : req.body.source_name,
// 			url : req.body.source_url
// 		},
// 		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')

// 	});

// 	// you can also add properties with the . (dot) notation
// 	if (req.body.birthdate) {
// 		newAstro.birthdate = moment(req.body.birthdate).toDate();
// 	}

// 	newAstro.skills = req.body.skills.split(",");

// 	// walked on moon checkbox
// 	if (req.body.walkedonmoon) {
// 		newAstro.walkedOnMoon = true;
// 	}
	
// 	// save the newAstro to the database
// 	newAstro.save(function(err){
// 		if (err) {
// 			console.error("Error on saving new astronaut");
// 			console.error(err); // log out to Terminal all errors

// 			var templateData = {
// 				page_title : 'Enlist a new astronaut',
// 				errors : err.errors, 
// 				astro : req.body
// 			};

// 			res.render('create_form.html', templateData);
// 			// return res.send("There was an error when creating a new astronaut");

// 		} else {
// 			console.log("Created a new astronaut!");
// 			console.log(newAstro);
			
// 			// redirect to the astronaut's page
// 			res.redirect('/astronauts/'+ newAstro.slug)
// 		}
// 	});
// };

// exports.editAstroForm = function(req, res) {

// 	// Get astronaut from URL params
// 	var astro_id = req.params.astro_id;
// 	var astroQuery = astronautModel.findOne({slug:astro_id});
// 	astroQuery.exec(function(err, astronaut){

// 		if (err) {
// 			console.error("ERROR");
// 			console.error(err);
// 			res.send("There was an error querying for "+ astro_id).status(500);
// 		}

// 		if (astronaut != null) {

// 			// birthdateForm function for edit form
// 			// html input type=date needs YYYY-MM-DD format
// 			astronaut.birthdateForm = function() {
// 					return moment(this.birthdate).format("YYYY-MM-DD");
// 			}

// 			// prepare template data
// 			var templateData = {
// 				astro : astronaut
// 			};

// 			// render template
// 			res.render('edit_form.html',templateData);

// 		} else {

// 			console.log("unable to find astronaut: " + astro_id);
// 			return res.status(404).render('404.html');
// 		}

// 	})

// }

// exports.updateAstro = function(req, res) {

// 	// Get astronaut from URL params
// 	var astro_id = req.params.astro_id;

// 	// prepare form data
// 	var updatedData = {
// 		name : req.body.name,
// 		photo : req.body.photoUrl,
// 		source : {
// 			name : req.body.source_name,
// 			url : req.body.source_url
// 		},
// 		birthdate : moment(req.body.birthdate).toDate(),
// 		skills : req.body.skills.split(","),

// 		walkedOnMoon : (req.body.walkedonmoon) ? true : false
		
// 	}


// 	// query for astronaut
// 	astronautModel.update({slug:astro_id}, { $set: updatedData}, function(err, astronaut){

// 		if (err) {
// 			console.error("ERROR: While updating");
// 			console.error(err);			
// 		}

// 		if (astronaut != null) {
// 			res.redirect('/astronauts/' + astro_id);

// 		} else {

// 			// unable to find astronaut, return 404
// 			console.error("unable to find astronaut: " + astro_id);
// 			return res.status(404).render('404.html');
// 		}
// 	})
// }

// exports.postShipLog = function(req, res) {

// 	// Get astronaut from URL params
// 	var astro_id = req.params.astro_id;

// 	// query database for astronaut
// 	astronautModel.findOne({slug:astro_id}, function(err, astronaut){

// 		if (err) {
// 			console.error("ERROR");
// 			console.error(err);
// 			res.send("There was an error querying for "+ astro_id).status(500);
// 		}

// 		if (astronaut != null) {

// 			// found the astronaut

// 			// concatenate submitted date field + time field
// 			var datetimestr = req.body.logdate + " " + req.body.logtime;

// 			console.log(datetimestr);
			
// 			// add a new shiplog
// 			var logData = {
// 				date : moment(datetimestr, "YYYY-MM-DD HH:mm").toDate(),
// 				content : req.body.logcontent
// 			};

// 			console.log("new ship log");
// 			console.log(logData);

// 			astronaut.shiplogs.push(logData);
// 			astronaut.save(function(err){
// 				if (err) {
// 					console.error(err);
// 					res.send(err.message);
// 				}
// 			});

// 			res.redirect('/astronauts/' + astro_id);


// 		} else {

// 			// unable to find astronaut, return 404
// 			console.error("unable to find astronaut: " + astro_id);
// 			return res.status(404).render('404.html');
// 		}
// 	})
// }

// exports.deleteAstro = function(req,res) {

// 	// Get astronaut from URL params
// 	var astro_id = req.params.astro_id;

// 	// if querystring has confirm=yes, delete record
// 	// else display the confirm page

// 	if (req.query.confirm == 'yes')  {  // ?confirm=yes
	
// 		astronautModel.remove({slug:astro_id}, function(err){
// 			if (err){ 
// 				console.error(err);
// 				res.send("Error when trying to remove astronaut: "+ astro_id);
// 			}

// 			res.send("Removed astronaut. <a href='/'>Back to home</a>.");
// 		});

// 	} else {
// 		//query astronaut and display confirm page
// 		astronautModel.findOne({slug:astro_id}, function(err, astronaut){

// 			if (err) {
// 				console.error("ERROR");
// 				console.error(err);
// 				res.send("There was an error querying for "+ astro_id).status(500);
// 			}

// 			if (astronaut != null) {

// 				var templateData = {
// 					astro : astronaut
// 				};
				
// 				res.render('delete_confirm.html', templateData);
			
// 			}
// 		})

// 	}
// };

// exports.remote_api = function(req, res) {

// 	var remote_api_url = 'http://itpdwdexpresstemplates.herokuapp.com/data/astronauts';
// 	// var remote_api_url = 'http://localhost:5000/data/astronauts';

// 	// make a request to remote_api_url
// 	request.get(remote_api_url, function(error, response, data){
		
// 		if (error){
// 			res.send("There was an error requesting remote api url.");
// 			return;
// 		}

// 		// Step 2 - convert 'data' to JS
// 		// convert data JSON string to native JS object
// 		var apiData = JSON.parse(data);

// 		console.log(apiData);
// 		console.log("***********");


// 		// STEP 3  - check status / respond
// 		// if apiData has property 'status == OK' then successful api request
// 		if (apiData.status == 'OK') {

// 			// prepare template data for remote_api_demo.html template
// 			var templateData = {
// 				astronauts : apiData.astros,
// 				rawJSON : data, 
// 				remote_url : remote_api_url
// 			}

// 			return res.render('remote_api_demo.html', templateData);
// 		}	
// 	})
// };

// exports.set_session = function(req, res) {

// 	// set the session with the submitted form data
// 	req.session.userName = req.body.name;
// 	req.session.userColor = req.body.fav_color;

// 	// redirect back to where they came from
// 	console.log(req.referrer);
// 	res.redirect('/');

// }
