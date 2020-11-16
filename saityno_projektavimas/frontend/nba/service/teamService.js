import http from './httpService';
import config from '../config.json';

const teamsAPI = config.API + 'teams';

export function GetAllTeams(){
    return http.get(teamsAPI);
}
export function GetTeamById(id){
    return http.get(`${teamsAPI}/${id}`);
}