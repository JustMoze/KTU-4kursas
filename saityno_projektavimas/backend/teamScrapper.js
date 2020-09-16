const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const config = require('config');
const { Team, validateTeam } =  require('./models/team');

var teams = [];
var savedTeams = [];
(async () => {
    const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
    await page.goto('https://www.nba.com/teams/');
    const team_elements = await page.$$('.team__list_scroll .team__list a');
    for(var i = 0; i < team_elements.length; i++){
        const elem = team_elements[i];
        const href = await page.evaluate(e => e.href, elem);
        const newPage = await browser.newPage();
        await newPage.goto(href, {waitUntil: 'networkidle2'});
        let teamData = await newPage.evaluate(async (i) => {
            let full_nameQuery = document.querySelector('.nba-team-header__team-location');
            let winLossQuery = document.querySelector('.winloss');
            let ppgQuery = document.querySelector('.team_stat span');
            let oppgQuery = document.querySelector('.oppg span');
            let rpgQuerry = document.querySelector('.rpg span');
            let apgQuerry = document.querySelector('.apg span');
            let conferenceQuery = document.querySelector('.conference').querySelector('.name');
            let divisionQuery = document.querySelector('.division').querySelector('.name');
            let winPQuery = document.querySelector('.percentage');
            let coachQuery = document.querySelector('.coaches tbody .cell-fullName');

            let conference = '';
            let full_name = '';
            let ppg = 0;
            let oppg = 0;
            let rpg = 0;
            let apg = 0;
            let winP = 0;
            let record = '';
            let division = '';
            let coach = '';
            

            if(conferenceQuery !== null || conferenceQuery !== undefined){
                conference = conferenceQuery.innerText;
            }
            if (full_nameQuery !== null || full_nameQuery !== null){
                full_name = full_nameQuery.innerText.replace(/(\r\n|\n|\r)/gm," ");
            }
            if (ppgQuery !== null || ppgQuery !== null){
                ppg = parseFloat(ppgQuery.innerText);
            }
            if (oppgQuery !== null || oppgQuery !== null){
                oppg = parseFloat(oppgQuery.innerText);
            }
            if (rpgQuerry !== null || rpgQuerry !== null){
                rpg = parseFloat(rpgQuerry.innerText);
            }
            if (apgQuerry !== null || apgQuerry !== null){
                apg = parseFloat(apgQuerry.innerText);
            }
            if (winPQuery !== null || winPQuery !== null){
                winP = winPQuery.innerText;
            }
            if (divisionQuery !== null || divisionQuery !== null){
                division = divisionQuery.innerText;
            }
            if (winLossQuery !== null || winLossQuery !== null){
                let word = winLossQuery.innerText;
                word = word.substring(0, 8);
                record = word.replace(/(\r\n|\n|\r)/gm," ");
            }
            if (coachQuery !== null || coachQuery !== null){
                coach = coachQuery.innerText.substring(5);
            }
            
            return {
                conference: conference,
                full_name: full_name,
                ppg: ppg,
                oppg: oppg,
                rpg: rpg,
                apg: apg,
                winP: winP,
                record: record,
                division: division,
                coach: coach
            }
        });
        console.log('My data', teamData);
        teams.push(teamData);
        await newPage.close();
    }
    Promise.all([saveTeams(teams)]);
    mongoose.disconnect();
    await browser.close();
})();

async function saveTeams(teams) {
	await mongoose.set('useCreateIndex', true);
	await mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true }, () => {
		console.log('Successfully connected to database');
	});
	await Team.deleteMany({});
	try {
		teams.forEach(async (team) => {
            const { error } = validateTeam(team);
			if (!error) {
				const mongoTeam = new Team(team);
				let teamSaved = await mongoTeam.save();
				savedTeams.push(teamSaved.full_name);
			}
		});
		console.log('Teams have been added to MongoDB');
	} catch (error) {
		console.log('error', error);
	}
}