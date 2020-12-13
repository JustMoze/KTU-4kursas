const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const config = require('config');
const { Player, validatePlayer } = require('./models/player');

var players = [];
var savedPlayers = [];
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.nba.com/players/');
	const player_elements = await page.$$('#player-list a.playerList');
	for (var i = 0; i < player_elements.length; i++) {
		const elem = player_elements[i];
		const href = await page.evaluate((e) => e.href, elem);
		const newPage = await browser.newPage();
		await newPage.goto(href, { waitUntil: 'networkidle2', timeout: 0 });
		let playerData = await newPage.evaluate(() => {
			let fullNameQuery = document.querySelector('.nba-player-header__details-bottom');
			let imgQuery = document.querySelector('img');
			let positionQuery = document.querySelector('span.nba-player-header__position');
			let weightQuery = document.querySelectorAll('.nba-player-vitals__top-info-imperial')[1];
			let heightQuery = document.querySelectorAll('.nba-player-vitals__top-info-imperial')[0];
			let mpgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[0];
			let fgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[1];
			let threePtQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[2];
			let ftQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[3];
			let ppgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[4];
			let rpgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[5];
			let apgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[6];
			let bpgQuery = document
				.querySelectorAll('table tbody')[0]
				.querySelectorAll('tr')[1]
				.querySelectorAll('td')[7];
			let ageQuery = document.querySelectorAll('.nba-player-vitals__bottom li')[1].querySelectorAll('span')[1];
			let numberQuery = document.querySelector('.nba-player-header__jersey-number');
			let teamQuery = document.querySelector('.nba-player-vitals__bottom-info strong');

			let fullName = '—';
			let position = '—';
			let weight = '—';
			let height = '—';
			let mpg = 0;
			let fg = 0;
			let threePt = 0;
			let ft = 0;
			let ppg = 0;
			let apg = 0;
			let rpg = 0;
			let bpg = 0;
			let age = 'undefined';
			let number = 'none';
			let team = 'none';
			let image = '—';

			if (fullNameQuery !== null && fullNameQuery !== undefined) {
				let value = fullNameQuery.innerText;
				let place = value.indexOf('\n\n');
				fullName = value.substr(0, place) + ' ' + value.substr(place + 2);
			}
			if (positionQuery !== null && positionQuery !== undefined) {
				position = positionQuery.innerText;
			}
			if (weightQuery !== null && weightQuery !== undefined) {
				weight = weightQuery.innerText;
			}
			if (heightQuery !== null && heightQuery !== undefined) {
				height = heightQuery.innerText;
			}
			if (mpgQuery !== null && mpgQuery !== undefined) {
				mpg = parseFloat(mpgQuery.innerText);
			}
			if (fgQuery !== null && fgQuery !== undefined) {
				fg = parseFloat(fgQuery.innerText);
			}
			if (threePtQuery !== null && threePtQuery !== undefined) {
				threePt = parseFloat(threePtQuery.innerText);
			}
			if (ftQuery !== null && ftQuery !== undefined) {
				ft = parseFloat(ftQuery.innerText);
			}
			if (ppgQuery !== null && ppgQuery !== undefined) {
				ppg = parseFloat(ppgQuery.innerText);
			}
			if (rpgQuery !== null && rpgQuery !== undefined) {
				rpg = parseFloat(rpgQuery.innerText);
			}
			if (apgQuery !== null && apgQuery !== undefined) {
				apg = parseFloat(apgQuery.innerText);
			}
			if (bpgQuery !== null && bpgQuery !== undefined) {
				bpg = parseFloat(bpgQuery.innerText);
			}
			if (ageQuery !== null && ageQuery !== undefined) {
				age = ageQuery.innerText;
			}
			if (numberQuery !== null && numberQuery !== undefined) {
				number = numberQuery.innerText;
			}
			if (teamQuery !== null && teamQuery !== undefined) {
				team = teamQuery.innerText;
			}
			if (imgQuery !== null && imgQuery !== undefined) {
				image = imgQuery.src;
			}

			return {
				fullName: fullName,
				position: position,
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
				bpg: bpg,
				apg: apg,
				foto: image,
				team: team
			};
		});
		players.push(playerData);
		await newPage.close();
	}
	Promise.all([savePlayers(players)]);
	mongoose.disconnect();
	await browser.close();
})();

async function savePlayers(players) {
	await mongoose.set('useCreateIndex', true);
	await mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true }, () => {
		console.log('Successfully connected to database');
	});
	await Player.deleteMany({});
	try {
		players.forEach(async (player) => {
			const { error } = validatePlayer(player);
			if (!error) {
				const mongoPlayer = new Player(player);
				let playerSaved = await mongoPlayer.save();
				savedPlayers.push(playerSaved.fullName);
			}
		});
		console.log('PLayers have been added to MongoDB');
	} catch (error) {
		console.log('error', error);
	}
}
