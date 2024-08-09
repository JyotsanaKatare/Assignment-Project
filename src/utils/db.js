
const mongoose = require('mongoose');

async function connectToDb() {
    try {
        const uri = "mongodb://127.0.0.1:27017/AssignmentDB";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports =  connectToDb ;


