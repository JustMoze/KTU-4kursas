const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome from nba :D');
});

module.exports = router;