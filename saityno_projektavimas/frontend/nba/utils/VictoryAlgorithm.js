import { GetUserTeam } from '../service/teamService';
import { GetPlayer } from '../service/playerService';

const vid_3pt_attempts = 29.0;
const vid_2pt_attempts = 57.0;
const vid_ft_attempts = 22.6;

const assists_points = 0.575;
const rebounds_points = 0.355;
const blk_points = 2;

export const CalculateWinner = (team1, team2) => {
    return new Promise(async (resolve, reject) => {
        const { data: leftTeam } = await GetUserTeam(team1);
	    const { data: rightTeam } = await GetUserTeam(team2);

	    let leftPlayers = [];
	    let rightPlayers = [];

	    for (let i = 0; i < leftTeam.players.length; i++) {
	    	const { data: player } = await GetPlayer(leftTeam.players[i]);
	    	leftPlayers.push(player);
	    }
	    for (let i = 0; i < rightTeam.players.length; i++) {
	    	const { data: player } = await GetPlayer(rightTeam.players[i]);
	    	rightPlayers.push(player);
        }

	    let leftTeamStats = { fg: 0, threePt: 0, ft: 0, ppg: 0, rpg: 0, bpg: 0, apg: 0 };
	    let rightTeamsStats = { fg: 0, threePt: 0, ft: 0, ppg: 0, rpg: 0, bpg: 0, apg: 0 };

	    leftPlayers.sort((player1, player2) => player2.price - player1.price);
	    rightPlayers.sort((player1, player2) => player2.price - player1.price);

	    leftPlayers.slice(0, 12);
	    rightPlayers.slice(0, 12);

	    leftPlayers.forEach((player) => {
	    	leftTeamStats = AddPlayerStats(leftTeamStats, player);
	    });
	    rightPlayers.forEach((player) => {
	    	rightTeamsStats = AddPlayerStats(rightTeamsStats, player);
	    });

	    leftTeamStats = RecalculateStats(leftTeamStats, leftPlayers.length);
	    rightTeamsStats = RecalculateStats(rightTeamsStats, rightPlayers.length);


        let leftPoints = CalculatePoints(leftTeamStats);
        let rightPoints = CalculatePoints(rightTeamsStats);

        if(leftPoints !== undefined && rightPoints !== undefined && leftTeamStats.ppg !== 0 && rightTeamsStats.ppg !== 0){
            resolve({left: leftPoints, right: rightPoints});
        } else {
            reject({msg: "Something happen"});
        }
    })
};

export const AddPlayerStats = (obj, player) => {
	let { fg, threePt, ft, ppg, rpg, bpg, apg } = obj;
	let newObj = {
		fg: fg + player.fg,
		threePt: threePt + player.threePt,
		ft: ft + player.ft,
		ppg: ppg + player.ppg,
		rpg: rpg + player.rpg,
		bpg: bpg + player.bpg,
		apg: apg + player.apg
	};
	return newObj;
};
export const RecalculateStats = (obj, length) => {
	let { fg, threePt, ft, ppg, rpg, bpg, apg } = obj;
	let fg1 = fg / length;
	let threePt1 = threePt / length;
    let ft1 = ft / length;
    let ppg1 = ppg / length;
	return {
		ppg: parseFloat(ppg1),
		rpg: parseFloat(rpg),
		bpg: parseFloat(bpg),
		apg: parseFloat(apg),
		fg: parseFloat(fg1),
		threePt: parseFloat(threePt1),
		ft: parseFloat(ft1)
	};
};

export const CalculatePoints = (obj) => {
    let { fg, threePt, ft, ppg, rpg, bpg, apg } = obj;

    let randPoints = Math.floor(Math.random() * 15) + 1; // 1 - 15

    let twoPts = parseFloat((fg / 100) * 2 * vid_2pt_attempts).toFixed(2); 
    let threePts = parseFloat((threePt / 100) * 3 * vid_3pt_attempts).toFixed(2);
    let ftPts = parseFloat((ft / 100) * 1 * vid_ft_attempts).toFixed(2);
    let teamPts = parseFloat((rpg * rebounds_points) + (bpg * blk_points) + (apg * assists_points)).toFixed(2);
    let points = parseFloat((+twoPts + +threePts + +ftPts + +teamPts + +randPoints)).toFixed(2);

    return parseFloat((+(points / 1.5) + +ppg));
}