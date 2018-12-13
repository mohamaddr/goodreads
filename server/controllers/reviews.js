var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');

var Books = require('../models/book');
var Users =require('../models/user');
var Review =require('../models/review');


// create a review 
router.post('/user/reviews', function(req,res,next){

	Books.findById(req.body.book)
		.then(book => {
		  if (!book) {
			return res.status(404).json({
			  message: "Book not found"
			});
		  }
	});


	Users.findById(req.body.postedBy)
		.then(user => {
		  if (!user) {
			return res.status(404).json({
			  message: "User not found"
			});	
		  }
	});


	var rev = new Review({
		book : req.body.book,
		feedback : req.body.feedback,
		postedBy : req.body.postedBy
	})

	rev.save(function(err){
		if(err){ return next(err);}
		res.status(201).json(rev);
	});
});

// show reviews 
// router.get('/user/review', function (req,res,next){
// 	Review.find({}).sort(req.query.sort).exec(function(err, review) {
// 		if(err){ return next(err);}
// 		res.json({"data": review});
// 	});
// });



 // show reviews, book id and user id are populated 
 router.get('/user/reviews', function (req,res,next){
    //Review.find({}).populate('book','name genre').populate('postedBy','name')
   Review.find({})
       .exec(function(err,review){
         if (err) return next(err);
        res.json({"data":review});
       });   
});


router.get('/admin/reviews', function (req,res,next){
    Review.find({}).populate('book','name genre').populate('postedBy','name')
  
       .exec(function(err,review){
         if (err) return next(err);
        res.json({"data":review});
       });   
});

// get the reviews with the given book id
router.get('/user/reviews/book/:id' ,function (req,res,next){
	var id = req.params.id;
	//Review.find({book:req.params.id}).populate('book','name genre').populate('postedBy','name')
	Review.find({book:req.params.id}).populate('postedBy','name')
	.exec(function(err,review){
	  if (err) return next(err);
	 //console.log('book of the review is ${review.bk.name}',);
	 res.json({"data":review});
	});
});





//edit a review
router.patch('/user/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findById(req.params.id, function(err, review){
		if(err) { return next(err); }
			if(review == null) {
				return res.status(404).json(
				{"message":"Review not found"});
			}
			review.book = review.book;
			review.feedback = (req.body.feedback || review.feedback);
			postedBy = review.postedBy;
			
			review.save();
			res.json(review);
	});
});

//delete a review
router.delete('/user/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findOneAndDelete({"_id": id}, function(err, review) {
		if(err) {return next(err);}
		if(review == null){
			return res.status(404).json(
			{"message": "Review not found"});
		}
		res.json(review);
	});
});

router.delete('/admin/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findOneAndDelete({"_id": id}, function(err, review) {
		if(err) {return next(err);}
		if(review == null){
			return res.status(404).json(
			{"message": "Review not found"});
		}
		res.json(review);
	});
});

module.exports=router








