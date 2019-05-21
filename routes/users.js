var express = require('express');
var router = express.Router();
const monk = require('monk');
// Connection URL
var dbUrl = require('../constants').dbUrl;
var db = monk(dbUrl);

console.log("dbUrl:"+dbUrl);
/* GET users listing. */
router.get('/', function(req, res, next) {
	if (db) {
	  db.collection('users').find()
	  .then(function(docs) {
		console.log("users found: %j",docs)
		if(docs.length>0){
			res.json({users: docs});
		}
		else{
			res.json({message: "No Users found"});
		}
	  })
	  .catch(function(err){
		  console.log(err);
		  next(new Error('Error while talking to database'));
	  });
	} else {
		console.log("in error block");
	  	next(new Error('Waiting for connection to database'));
	}
});

/* GET users listing. */
router.post('/', function(req, res, next) {
	console.log("inserting user ="+ req.body);
	db.collection('users').insert(req.body)
	.then(function(doc) {
		console.log("users found: %j",doc)
		if(doc._id){
			res.json({message: 'User inserted'});
		}
		else{
			res.json({message: "Could not insert document"});
		}
	})
	.catch(function(err){
		console.log(err);
		next(new Error('Error while talking to database'));
	});
});

module.exports = router;
