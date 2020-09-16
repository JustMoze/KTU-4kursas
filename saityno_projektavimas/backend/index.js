const express = require('express')
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index');
const playersRouter = require('./routes/player');


app.use(express.json());
app.use('/', router);
app.use('/players', playersRouter);

const PORT = process.env.PORT || config.get('port');
// connect to db
const db = config.get('db');
mongoose.set('useCreateIndex', true);
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Successfully connected to database');
    }
);
app.listen(PORT, console.log(`Server is running on port ${PORT}`));