
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
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000); 
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '642c76cd02ac802773b5729c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://source.unsplash.com/collection/483251`,
            description:"Loren ipsum - this is cool disctionption ifn you didn tha vhe have anthing",
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude, 
                cities[random1000].latitude 
              ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271117/YelpCamp/l1wvtsw7rkzd1rpuqb0m.jpg',
                    filename: 'YelpCamp/l1wvtsw7rkzd1rpuqb0m'
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271120/YelpCamp/fmqoigbabzjfglezfmjf.jpg',
                    filename: 'YelpCamp/fmqoigbabzjfglezfmjf'
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271271/YelpCamp/amyggwv38w2dzmsvss7j.jpg',
                    filename: 'YelpCamp/amyggwv38w2dzmsvss7j',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271272/YelpCamp/tvcboh2bm6x7xnvlp6xs.jpg',
                    filename: 'YelpCamp/tvcboh2bm6x7xnvlp6xs',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271274/YelpCamp/xlv8tzxoalgcxqkoge2m.jpg',
                    filename: 'YelpCamp/xlv8tzxoalgcxqkoge2m',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dybznrhqn/image/upload/v1681271277/YelpCamp/c5hawl6rbw9o3byjsosm.jpg',
                    filename: 'YelpCamp/c5hawl6rbw9o3byjsosm',
                  
                  }
              ]

        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
});