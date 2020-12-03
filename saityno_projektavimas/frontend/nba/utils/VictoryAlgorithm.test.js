import { CalculatePoints, RecalculateStats, AddPlayerStats, CalculateWinner } from './VictoryAlgorithm';

const vid_3pt_attempts = 29.0;
const vid_2pt_attempts = 57.0;
const vid_ft_attempts = 22.6;

const assists_points = 0.575;
const rebounds_points = 0.355;
const blk_points = 2;

test("Test calculatePoints function", () => {
    let obj = { fg: 48, threePt: 35, ft: 85, ppg: 50, rpg: 15, bpg: 9.2, apg: 17.8 };
    let randomPoints = 7.7;
    expect(typeof randomPoints).toBe('number');

    let twoPts = parseFloat((obj.fg / 100) * 2 * vid_2pt_attempts).toFixed(2); 
    let threePts = parseFloat((obj.threePt / 100) * 3 * vid_3pt_attempts).toFixed(2);
    let ftPts = parseFloat((obj.ft / 100) * 1 * vid_ft_attempts).toFixed(2);
    let teamPts = parseFloat((obj.rpg * rebounds_points) + (obj.bpg * blk_points) + (obj.apg * assists_points)).toFixed(2);
    let points = parseFloat((+twoPts + +threePts + +ftPts + +teamPts + +randomPoints)).toFixed(2);

    let result = CalculatePoints(obj);
    result = parseFloat(result);

    twoPts = parseFloat(twoPts);
    threePts = parseFloat(threePts);
    ftPts = parseFloat(ftPts);
    teamPts = parseFloat(teamPts);
    points = parseFloat(points);

    expect(twoPts).toBeGreaterThanOrEqual(30);
    expect(twoPts).toBeLessThanOrEqual(120);

    expect(threePts).toBeGreaterThanOrEqual(30);
    expect(threePts).toBeLessThanOrEqual(90);

    expect(ftPts).toBeGreaterThanOrEqual(0);
    expect(ftPts).toBeLessThanOrEqual(50);

    expect(teamPts).toBeGreaterThanOrEqual(25);
    expect(teamPts).toBeLessThanOrEqual(75);

    expect(points).toBeGreaterThanOrEqual(140);
    expect(points).toBeLessThanOrEqual(340);   

    expect(CalculatePoints(obj)).toBeGreaterThanOrEqual(70);
    expect(CalculatePoints(obj)).toBeLessThanOrEqual(170);
});

test('Add player stats function', () => {
    let newObj = {  fg: 0, threePt: 0, ft: 0, ppg: 0, rpg: 0, bpg: 0, apg: 0}
    let objToAdd = {fg: 15.7, threePt: 15.7, ft: 15.7, ppg: 15.7, rpg: 15.7, bpg: 15.7, apg: 15.7}

    expect(AddPlayerStats(newObj, objToAdd)).toEqual({fg: 15.7, threePt: 15.7, ft: 15.7, ppg: 15.7, rpg: 15.7, bpg: 15.7, apg: 15.7});
});

test('Calculate points function', () => {
    let length = 3;
    let objToAdd = {fg: 30.3, threePt: 30.3, ft: 30.3, ppg: 30.3, rpg: 30.3, bpg: 30.3, apg: 30.3}

    expect(RecalculateStats(objToAdd, length)).toEqual({fg: 10.1, threePt: 10.1, ft: 10.1, ppg: 10.1, rpg: 30.3, bpg: 30.3, apg: 30.3});
});

test('CalculateWinner function return promise resolve data', () => {
    jest.setTimeout(30000);
    let left_1 = '5fad20feefc6ac159cfc566d';
    let right_1 = '5f6b240fd432c92a30ca5159';
    return expect(CalculateWinner(left_1, right_1)).resolves.toMatchObject({
        left: expect.any(Number),
        right: expect.any(Number)
    });
});
// test('CalculateWinner function return reject resolve data', () => {
//     jest.setTimeout(30000);
//     let left_1 = '5fb970a5cf31a50004f5e929';
//     let right_1 = '5fb970bbcf31a50004f5e92a';
//     return expect(CalculateWinner(left_1, right_1)).rejects.toEqual({
//         left: NaN,
//         right: NaN,
//     });
// });