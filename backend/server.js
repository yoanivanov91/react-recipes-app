require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { errorHandler } = require('./src/middlewares/errorHandler');
const connectDB = require('./src/config/dbConfig');
const recipesRoute = require('./src/routes/recipesRoute');
const usersRoute = require('./src/routes/usersRoute');

async function startServer() {
    await connectDB();
    
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api/recipes', recipesRoute);
    app.use('/api/users', usersRoute);

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer();