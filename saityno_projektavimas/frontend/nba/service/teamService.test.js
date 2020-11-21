const { GetAllTeams, GetUserTeam, GetTeamById } = require('./teamService');

it('gets all teams', async () => {
	const { data: teams } = await GetAllTeams();

	expect(teams.length).toBeGreaterThan(0);
});

global.fetch = jest.fn(() => {
	Promise.resolve({
		json: () =>
			Promise.resolve({
				_id: { $oid: '5fb7e80a8fd9af000431f232' },
				players: [
					{ $oid: '5f62427b92c3b8345482f4c4' },
					{ $oid: '5f62427b92c3b8345482f4a6' },
					{ $oid: '5f62427b92c3b8345482f4de' },
					{ $oid: '5f62427b92c3b8345482f4d5' }
				],
				ownerId: '5fad20feefc6ac159cfc566d',
				logo: 'https://upload.wikimedia.org/wikipedia/en/0/0e/BC_Pieno_%C5%BDvaig%C5%BEd%C4%97s.png',
				name: 'Pieno žvaigždės',
				ppg: { $numberInt: '0' },
				rpg: { $numberInt: '0' },
				apg: { $numberInt: '0' },
				fg: { $numberInt: '0' },
				threePt: { $numberInt: '0' },
				ft: { $numberInt: '0' },
				__v: { $numberInt: '4' }
			})
	});
});

it('Get user team', async () => {
  const { data: team } = await GetUserTeam('5fad20feefc6ac159cfc566d')
  expect(team).toEqual({
    _id: '5fb7e80a8fd9af000431f232',
    players: [
      '5f62427b92c3b8345482f4c4',
      '5f62427b92c3b8345482f4a6',
      '5f62427b92c3b8345482f4de',
      '5f62427b92c3b8345482f4d5',
    ],
    ownerId: '5fad20feefc6ac159cfc566d',
    logo:
      'https://upload.wikimedia.org/wikipedia/en/0/0e/BC_Pieno_%C5%BDvaig%C5%BEd%C4%97s.png',
    name: 'Pieno žvaigždės',
    ppg: 0,
    rpg: 0,
    apg: 0,
    fg: 0,
    threePt: 0,
    ft: 0,
    __v: 4,
  })
})

it('Get team by id', async () => {
  const { data: team } = await GetTeamById('5f6249e67b32ff38e055e860')
  expect(team).toEqual({
    _id: '5f6249e67b32ff38e055e860',
    season: '2019-2020 season',
    conference: 'East',
    full_name: 'Brooklyn  Nets',
    ppg: 111.8 ,
    oppg: 112.3 ,
    rpg: 47.9 ,
    apg: 24.5 ,
    winP: '48.6%',
    record: 'W35 L37 ',
    division: 'Atlantic',
    coach: 'Steve Nash',
    logo: 'https://www.nba.com/assets/logos/teams/primary/web/BKN.svg',
    abbreviation: 'BKN',
    color: '#000000',
    __v: 0 
  })
})