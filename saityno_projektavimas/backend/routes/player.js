const { Player, validatePlayer } = require('../models/player');
const express = require('express');


const router = express.Router();

router.get('/:page', (req, res) => {
	try {
		const options = {
			page: req.params.page,
			limit: 15,
			collation: {
				locale: 'en',
			},
		};
		Player.paginate({}, options, (er, result) => {
			if(!er){
				res.json(result.docs);
			}
		})
	} catch (ex) {
		throw new Error(ex);
	}
});
router.get('/team/:name', async (req, res) => {
	let teamAbbreviation = req.params.name.toUpperCase();
	if(teamAbbreviation.length !== 3){
		res.send("NBA team's abbreviation formated incorrectly.")
	} else {
		let playersByTeam = await Player.find({team: teamAbbreviation});
		if((await playersByTeam).length === 0 ){
			res.send(`There are no players of team which abreviation - ${teamAbbreviation}`);
		} else {
			res.send(playersByTeam);
		}
	}
});

router.get('/name/:name', async (req, res) => {
	let playerName = req.params.name.toLocaleLowerCase();
	if(playerName === '' || playerName === null){
		let allPLayers = await Player.find({});
		res.send(allPLayers);
	} else {
		let containingPlayers = await Player.find({
			fullName: { '$regex': playerName, '$options': 'i'}
		});
		if (containingPlayers.length === 0){
			res.send(`No players were found by your query ${playerName}`);
		} else {
			res.send(containingPlayers);
		}
	}
});

module.exports = router;
