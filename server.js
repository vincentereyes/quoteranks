var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise;

var AuthorSchema = new mongoose.Schema({
    name:  { type: String, required: [true, "Name is minimum of 3 characters"], minlength: [3, "Name is minimum of 3 characters"]},
    quotes: [{
        quote: { type: String, required: [true, "Quote is minimum of 3 characters"], minlength: [3, "Quote is minimum of 3 characters"]},
        vote: { type: Number, default: 0}
    }]
}, {timestamps: true });

mongoose.model('Author', AuthorSchema); // We are setting this Schema in our Models as 'User'
var Author = mongoose.model('Author');

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

app.use(express.static(path.join(__dirname, '/authorsApp/dist')));
// Setting our Views Folder Directory

// Setting our View Engine set to EJS
// Routes
// Root Request
app.get('/authors', function(req, res) {
    console.log("YOOOO")
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Author.find({}, function(err, authors) {
    	if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: authors});
    	}
    })
})

app.get('/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Author.findOne({_id: req.params.id}, function(err, author){
		if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: author});
    	}
	})   
})

app.post('/author', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    console.log(req.body)
    var author = new Author();
    author.name = req.body.name;
    author.quotes = [];
    author.save(function(err) {
    if (err) {
    		console.log("error")
            res.json({message: "Error", error: author.errors})
    	} else {
    		res.json({message: "success"});
    	}	
    })    
})

app.put('/author/edit/:id', function(req, res) {
    Author.findOne({_id: req.params.id}, function(err, author) {
    author.name = req.body.name;
    author.save(function(err){
    	if (err) {
        res.json({message: "Error", error: author.errors})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.put('/author/quote/:id', function(req, res) {
    Author.findOne({_id: req.params.id}, function(err, author) {
    author.quotes.push({ quote: req.body.quote})
    author.save(function(err){
        if (err) {
        res.json({message: "Error", error: author.errors})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.put("/author/:aid", function(req, res){
    console.log(req.body)
    Author.findOne({_id: req.params.aid}, function(err, author) {
        for (var i = 0; i < author.quotes.length; i++){
            if (req.body._id == author.quotes[i]._id){
                author.quotes.splice(i, 1)
            }
        }
    author.save(function(err){
        if (err) {
        res.json({message: "Error", error: author.errors})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.put("/author/up/:aid", function(req, res){
    Author.findOne({_id: req.params.aid}, function(err, author) {
        for (var i = 0; i < author.quotes.length; i++){
            if (req.body._id == author.quotes[i]._id){
                author.quotes[i].vote += 1
            }
        }
    author.save(function(err){
        if (err) {
        res.json({message: "Error", error: author.errors})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.put("/author/down/:aid", function(req, res){
    Author.findOne({_id: req.params.aid}, function(err, author) {
        for (var i = 0; i < author.quotes.length; i++){
            if (req.body._id == author.quotes[i]._id){
                author.quotes[i].vote -= 1
            }
        }
    author.save(function(err){
        if (err) {
        res.json({message: "Error", error: author.errors})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.delete("/author/delete/:id", function(req, res) {
    Author.remove({_id: req.params.id}, function(err){
        if (err){
            console.log(err)
        }else {
            res.json({message: "success"});
        }
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})