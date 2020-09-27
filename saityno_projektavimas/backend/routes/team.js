const { Team, validateTeam } = require('../models/team');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', async (req, res) => {
    const allTeams = await Team.find({});
    if(allTeams){
        res.send(allTeams);
    }
});
router.get('/:id', validateObjectId, async (req, res) => {
    let {id} = req.params;
    const team = await Team.findById(id);
    if(team){
        res.send(team);
    } else res.send(404);
});

module.exports = router;