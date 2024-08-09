
const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./utils/db');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const principalRoutes = require('./routes/principal');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    const principal = req.headers['x-principal'];
    if (principal) {
        req.principal = JSON.parse(principal);
    }
    next();
});

app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/principal', principalRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDb();
});
