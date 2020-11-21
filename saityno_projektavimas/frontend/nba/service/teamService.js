import http from './httpService';
import config from '../config.json';

const teamsAPI = config.API + 'teams';
const customTeamAPI = config.API + 'customteam';

export function GetAllTeams(){
    return http.get(teamsAPI);
}
export function GetTeamById(id){
    return http.get(`${teamsAPI}/${id}`);
}
export function GetUserTeam(userId){
    return http.get(`${customTeamAPI}/${userId}`);
}