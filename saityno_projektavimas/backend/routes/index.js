const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome to 2019-2020 NBA season API');
});

module.exports = router;