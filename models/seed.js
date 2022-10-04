///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Dog = require('./dog')

// Here, we're going to set up a seed script
// this will seed our database for us, so we have some starting resources
// This script will be run, with the command in the terminal `npm run seed`


///////////////////////////////////////
// Seed Script code
// npm run seed (from terminal)

///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startDogs = [
        { name: "Rugby", breed: "English Shepherd", easyToTrain: true },
        { name: "Handsome Stranger", breed: "Jack Russel Terrier", easyToTrain: false },
        { name: "Buttercup", breed: "Yellow Lab", easyToTrain: false },
        { name: "Trooper", breed: "Pitbull", easyToTrain: true },
    ]

    // delete all the existing fruits
    Dog.deleteMany({})
        .then(deletedDogs => {
            console.log('this is what .deleteMany returns', deletedDogs)

            // create a bunch of new fruits from startFruits
            Dog.create(startDogs)
                .then(data => {
                    console.log('here are the newly created dogs', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})