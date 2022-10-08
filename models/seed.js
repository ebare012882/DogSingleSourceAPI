///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Dog = require('./dog')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter fruits
    const startDogs = [
        { name: "Rugby", breed: "English Shepherd", easyToTrain: true },
        { name: "Handsome Stranger", breed: "Jack Russell Terrier", easyToTrain: false },
        { name: "Buttercup", breed: "Yellow Lab", easyToTrain: false },
        { name: "Trooper", breed: "Pitbull", easyToTrain: true },
        { name: "Poppy", breed: "Bagel: Bassethound/Beagle Mix", easyToTrain: true }
    ]

    // delete all the existing fruits
    Dog.deleteMany({ owner: null })
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