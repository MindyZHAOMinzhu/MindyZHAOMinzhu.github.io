var express = require('express');
var router = express.Router();
var totalmark = 0

var loki = require('lokijs');

var db = new loki('data.json', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
    var bookings = db.getCollection("bookings");
    if (bookings === null) {
        bookings = db.addCollection("bookings");
    }
}

//grayed out？

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


/* Handle the Form */
router.post('/form', function (req, res, next) {


    // console.log("req.body");
    // console.log(req.body);


    if (req.body.answer1 == "Incorrect") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer2 == "Incorrect") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer3 == "Incorrect") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }
    if (req.body.answer4 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer5 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer6 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }
    if (req.body.answer7 == "Incorrect") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer8 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer9 == "Incorrect") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer10 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer11 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    if (req.body.answer12 == "Correct") {
        totalmark = totalmark + 1
    } else {
        totalmark = totalmark
    }

    

    if (totalmark >= 0 && totalmark <= 4) {
        totalmark = "0-4 points"
    } else if (totalmark >= 5 && totalmark <= 8) {
        totalmark = "5-8 points"
    } else if (totalmark >= 9 && totalmark <= 12) {
        totalmark = "9-12 points"
    }

    console.log(totalmark);
    //What does this line do? Does totalmark goes into the data file?


    //db.getCollection("bookings").insert(req.body); // add the record to the database
    db.getCollection("bookings").insert({totalmark: totalmark}); // add the record to the database

    let result = db.getCollection("bookings").find();

    // result.forEach(function(b) {
    //     delete b.name;
    //     delete b.email;
    //     delete b.numTickets;
    //     delete b.gender;
    //     delete b.remarks;
    // });

    res.json(result);
    totalmark = 0

});

module.exports = router;


// How to count the points and show in the result? 


