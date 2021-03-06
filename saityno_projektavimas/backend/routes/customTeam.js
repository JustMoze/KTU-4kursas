const { CustomTeam, validateCustomTeam } = require('../models/customTeam');
const { Player } = require('../models/player');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.post('/:id', validateObjectId, async (req, res) => {
	const { error } = validateCustomTeam(req.body);
	const { id } = req.params;
	if (error) {
		return res.sendStatus(400);
	}
	try {
		let customTeam = new CustomTeam({
			ownerId: id,
			players: [],
			logo: req.body.logo,
			name: req.body.name,
			ppg: 0,
			rpg: 0,
			apg: 0,
			fg: 0,
			threePt: 0,
			ft: 0
		});
		await customTeam.save();
		res.status(200).send(customTeam);
	} catch (ex) {
		res.sendStatus(400);
		throw new Error(ex);
	}
});
// find customTeam by owner id
router.get('/:id', validateObjectId, async (req, res) => {
	let { id } = req.params;
	let teamToGet = await CustomTeam.findOne({ ownerId: id });
	if (!teamToGet) {
		res.send('User does not have created his favorite team');
	} else res.send(teamToGet);
});

router.delete('/:id', validateObjectId, async (req, res) => {
    let {id} = req.params;
    try {
        await CustomTeam.findOneAndRemove({ownerId: id}, {useFindAndModify: false});
        res.send('Team was successfully deleted.');
    } catch (error) {
        res.sendStatus(404);
    }
});
router.put('/:id/:playerId', validateObjectId, async (req, res) => {
    let { id, playerId } = req.params;
    try {
		let teamToUpdate = await CustomTeam.findOne({ownerId: id});
		if(!teamToUpdate){
			res.status(400).json({message: 'Error occured while getting custom team'});
		}
        teamToUpdate.players.pull({_id: playerId});
        teamToUpdate.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(404);
    }
});

router.patch('/:id/:playerId', validateObjectId, async (req, res) => {
	let { id, playerId } = req.params;
	try {
		let playerToAdd = await Player.findById(playerId);
		let teamToPatch = await CustomTeam.findOne({ ownerId: id });
		teamToPatch.players.push(playerToAdd);
		teamToPatch.save();
        res.send(teamToPatch);
	} catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router;
