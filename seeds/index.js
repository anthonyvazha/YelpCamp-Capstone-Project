
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
            author: '642c76cd02ac802773b5729c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://source.unsplash.com/collection/483251`,
            description:"Loren ipsum - this is cool disctionption ifn you didn tha vhe have anthing",
            price,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183445/YelpCamp/pclytikumuvahuu01d8s.jpg',
                  filename: 'YelpCamp/pclytikumuvahuu01d8s'
                  
                },
                {
                  url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183452/YelpCamp/f47vc4at2dwxkcgfaxgy.jpg',
                  filename: 'YelpCamp/f47vc4at2dwxkcgfaxgy'
                  
                },
                {
                  url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183457/YelpCamp/sg9r4dnvebu7khu16rje.jpg',
                  filename: 'YelpCamp/sg9r4dnvebu7khu16rje'
                  
                },
                {
                  url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183464/YelpCamp/pwyq1eho1t5opkmlbu02.jpg',
                  filename: 'YelpCamp/pwyq1eho1t5opkmlbu02'
                  
                },
                {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183525/YelpCamp/wvovrl9lt3keevyc61ew.jpg',
                    filename: 'YelpCamp/wvovrl9lt3keevyc61ew'
                },
                {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681183532/YelpCamp/pke7fwr8hrfsbetw0lax.jpg',
                    filename: 'YelpCamp/pke7fwr8hrfsbetw0lax'
                }
              ]

        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
});