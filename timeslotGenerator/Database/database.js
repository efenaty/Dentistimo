var mongoose = require ("mongoose");
var mongoURI = "mongodb+srv://group8:group8group8@cluster0.bnho2.mongodb.net/Dentistimo?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
// The code is from the web development project
function connect(){
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
        if (err) {
            console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
            console.error(err.stack);
            process.exit(1);
        }
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    });
};

module.exports= {
    connect : connect()
}
    


