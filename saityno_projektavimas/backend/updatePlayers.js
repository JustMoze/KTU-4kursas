const mongoose = require('mongoose');
const config = require('config');
const { Player } = require('./models/player');

async function updatePlayers() {
	let counter = 0;
	await mongoose.set('useCreateIndex', true);
	await mongoose.connect(
		config.get('db'),
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
		() => {
			console.log('Successfully connected to database');
		}
	);
	for await (const player of Player.find({})) {
		await Player.findByIdAndUpdate(
			{
				_id: player._id
			},
			{ useFindAndModify: true },
			{
				price: calculatePrice(player)
			}
		);
    }
    console.log('Couner', counter);
}

function calculatePrice(player) {
	let { ppg, fg, threePt, ft, rpg, apg, bpg } = player;
	let price = 50000;
	let scorePrice = 0;
	if ((fg !== 0 && threePt >= 25, ft !== 0)) {
		scorePrice = ppg * 4000000 * (threePt * ft * fg / Math.pow(100, 3));
	} else if ((fg !== 0 && threePt < 25, ft !== 0)) {
		scorePrice = ppg * 2500000 * (ft * fg / Math.pow(100, 2));
	}
	price += scorePrice + (rpg + apg) * 150000 + bpg * 100000;
	return price.toFixed(2);
}

function executeUpdating() {
	Promise.all([ updatePlayers() ]);
	console.log('successfully updated!');
	mongoose.disconnect();
	console.log('Mongo db successfully disconnected');
}
executeUpdating();
