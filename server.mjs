import express from 'express'; // Import the Express framework
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import * as user from './user_model.mjs'

const app = express(); // Create an Express application

const PORT = 3000; // Set the port number for the server

const DBsessionstore = MongoDBStore(session);

// Set up the MongoDBStore for session storage
const store = new DBsessionstore({
    uri: process.env.MONGODB_CONNECT_STRING, // MongoDB connection string
    collection: 'sessions', // Collection name to store sessions in the database
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native' 
});

store.on('error', function(error) {
    console.log(error);
});

app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(session({
    secret: process.env.SECRET_STRING, // Secret key used for session encryption
    resave: false,
    saveUninitialized: true,
    store: store,
}));

/*
    Code modified from
    https://meghagarwal.medium.com/storing-sessions-with-connect-mongo-in-mongodb-64d74e3bbd9c
    to create a user session
*/
app.get('/', (req, res, next) => {

    req.session.user = {
        username: `Guest`,
        isAuthenticated: false,
    } //THIS SETS AN OBJECT - 'USER'
    req.session.save(err => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/index.html')
        }
    }); //THIS SAVES THE SESSION.
})

// Create leaderboard features
app.get('/globalStats', async (req, res) => {

    console.log(`Recieved Request from ${req.session.user.username} for global stats`)

    try {
        // Get all stats from data base through function
        const globalStats = await user.getGlobalStats();

        // Send the usernames, times played, times won
        console.log("Sent global stats json to user");

        res.json(globalStats);
    }
    catch (error)
    {
        console.log('Error getting global data: ', error);
    }
})

app.get('/userStats', async (req, res) => {

    console.log(`Recieved Request from ${req.session.user.username} for user stats`)

    try {
        let userStats;
        // Get all stats from data base through function
        if (req.session.user.isAuthenticated == true)
        {
            userStats = await user.getUserStats(req.session.user.username);
        }
        else
        {
            userStats = null;
        }

        // Send the username, times played, times won

        console.log("Sent user stats json to user");

        res.json(userStats);
    }
    catch (error)
    {
        console.log('Error getting local data: ', error);
    }
})

// Create game features

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
