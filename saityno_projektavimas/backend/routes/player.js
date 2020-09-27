const { Player, validatePlayer } = require('../models/player');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');


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
router.post('/', async (req, res) => {
	const {error} = validatePlayer(req.body);
	if(error){
		return res.status(400).send(error.details[0].message);
	}
	try {
		let {fullName, position, price, number, weight, 
			height, age, mpg, fg, threePt, ft, ppg, rpg, apg, bpg, foto, team } = req.body;
		const newPlayer = new Player({
			fullName: fullName,
			position: position,
			price: price,
			number: number,
			weight: weight,
			height: height,
			age: age,
			mpg: mpg,
			fg: fg,
			threePt: threePt,
			ft: ft,
			ppg: ppg,
			rpg: rpg,
			apg: apg,
			bpg: bpg,
			foto: foto, 
			team: team
		});
		await newPlayer.save();
		res.send(newPlayer);
		
	} catch (error) {
		console.log('Unexpected error ->', error);
		res.send(error);
	}
});
router.delete('/:id', validateObjectId, async (req,res) => {
	const playerToDelete = await Player.findByIdAndDelete(req.params.id);

	if(!playerToDelete){
		return res.status(400).send('The player with given ID was not found');
	}
	res.send("Player was successfully removed from database");
});
router.get('/all/count', async (req, res) => {
	let count = await Player.countDocuments({});
	res.json(count);
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

router.get('/id/:id', validateObjectId, async (req, res) => {
	let { id } = req.params;
	let player = await Player.findById(id);
	if(player){
		res.send(player);
	} else res.status(404).send('The player with given ID was not found');
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
