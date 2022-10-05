////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Dog = require("../models/dog")
const { findById } = require("../models/user")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////


// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Dog.find({})
        .populate("comments.author", "username")
        .then(dogs => {
            // this is fine for initial testing
            // res.send(dogs)
            // this the preferred method for APIs
            res.json({ dogs: dogs })
        })
        .catch(err => console.log(err))
})

// POST request
// create route -> gives the ability to create new fruits
router.post("/", (req, res) => {
    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // this is going to add ownership, via a foreign key reference, to our fruits
    // basically, all we have to do, is append our request body, with the `owner` field, and set the value to the logged in user's id
    req.body.owner = req.session.userId
    // we'll use the mongoose model method `create` to make a new fruit
    Fruit.create(req.body)
        .then(dog => {
            // send the user a '201 created' response, along with the new fruit
            res.status(201).json({ dog: dog.toObject() })
        })
        .catch(error => console.log(error))
})

// Get request
// only dogs owned by loggen in user
// we're going to build another route that is owner specific to list all the dogs owned by a certain loggeed in user
// uses a foreign key reference (an ID)
router.get('/mine', (req, res) => {
    // find the dogs by ownership
    Dog.find({ owner: req.session.userId })
    // then display the dogs
        .then(dogs => {
            res.status(200).json({ dogs: dogs })
        })
    // or throw an error if there is one
        .catch(error => console.log(error))
})


// PUT request
// update route -> updates a specific fruit
router.put("/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    Dog.findById(id)
        .then(dog => {
            if (dog.owner == req.session.userId) {
                res.sendStatus(204)
                return dog.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .catch(error => res.json(error))
})

// DELETE request
// destroy route -> finds and deletes a single resource(dog)
router.delete("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    // find and delete the dog
    // Dog.findByIdAndRemove(id)
    Dog.findById(id)
        .then(dog => {
            // we check for ownership against the logged in user's id
            // double equals here checks that the values are the same but doesn't get hung up on the data type
            if (dog.owner == req.session.userId) {
                    // if successful, send a status and delete the dog
                    res.sendStatus(204)
                    return dog.deleteOne()
                } else {
                    // if they are not the user, send the unauthorized status
                    res.sendStatus(401)
                }
            })
            // send the error if not
            .catch(err => res.json(err))
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Dog.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // to remove add - before the word "-password"
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("comments.author", "username")
        .then(dog => {
            res.json({ dog: dog })
        })
        .catch(err => console.log(err))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router