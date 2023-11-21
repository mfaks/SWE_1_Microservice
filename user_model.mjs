import 'dotenv/config';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Connect to the MongoDB database
mongoose.connect(
        process.env.MONGODB_CONNECT_STRING,
        {
        }
    );

const db = mongoose.connection;

const userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true },
    password: {type: String, required: true},
    timesPlayed: {type: Number},
    timesWon: {type: Number}
});

// getStats
const getUserStats = async (username) => {
    try 
    {
        const user = await User.findOne({ username });

        if (user)
        {
            const timesPlayed = user.timesPlayed;
            const timesWon = user.timesWon;

            return {username, timesPlayed, timesWon};
        }
        else
        {
            return null;
        }
    }
    catch (error)
    {
        throw error;
    }
}

const getGlobalStats = async () => {
    try 
    {
        const topPlayers = await User.find().sort({ timesWon: -1 }).limit(10).select('-password');;

        return topPlayers;
    }
    catch (error)
    {
        throw error;
    }
}

// updateStats
const updateStats = async (username, hasWon) => {
    try 
    {
        const user = await User.findOne({ username });

        if (user)
        {
            const filter = { username: username };
            let update;

            if (hasWon == 1) // Game is won
            {
                update = {
                    $inc: { timesPlayed: 1, timesWon: 1 }
                };
            }
            else if (hasWon == 0) // Game is lost
            {
                update = {
                    $inc: { timesPlayed: 1, timesWon: 0 }
                };
            }

            const result = await User.updateOne(filter, update);

            console.log(`${username} document has been updated.`);
        }
    }
    catch (error)
    {
        throw error;
    }
}

const User = mongoose.model('User', userSchema);

db.once("open", () => {
    console.log("Connected to MongoDB using Mongoose!")
});

export { getUserStats, getGlobalStats, updateStats}