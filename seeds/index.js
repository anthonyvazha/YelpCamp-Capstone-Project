
const mongoose = require("mongoose");
const cities = require('./cities')
const Campground = require("../models/campground");
const {places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp' , {
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true
 
});

const db = mongoose.connection;//Shorten Our Code
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description:"Loren ipsum - this is cool disctionption ifn you didn tha vhe have anthing",
            price 

        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
});