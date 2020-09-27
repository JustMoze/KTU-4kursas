require('dotenv').config()
const express = require('express')
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index');
const playersRouter = require('./routes/player');
const usersRouter = require('./routes/user');
const customTeamRouter = require('./routes/customTeam');
const teamRouter = require('./routes/team');
const authRoute = require('./routes/auth');
const path = require('path');


app.use(express.json());
app.use('/', router);
app.use('/players', playersRouter);
app.use('/user', usersRouter);
app.use('/customteam', customTeamRouter);
app.use('/teams', teamRouter);
app.use('/auth', authRoute);
app.use('*', function(req, res){
    res.send(404);
    // res.sendFile(path.join(__dirname, './public', 'index.html'));
});
const PORT = process.env.PORT || config.get('port');

const db = config.get('db');
mongoose.set('useCreateIndex', true);
const uri = `mongodb+srv://nbaadmin:${process.env.PASSWORD}@nbafantasy.auhyl.mongodb.net/nba?retryWrites=true&w=majority`;
mongoose.connect(
    uri || db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Successfully connected to database');
    }
);
mongoose.connection.on('connected', () => {
    console.log('Connected to cluster');
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));