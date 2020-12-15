import http from './httpService';
import config from '../config.json';

const playersApi = config.API + 'players';

export function GetPlayer(id) {
    return http.get(`${playersApi}/id/${id}`);
}

export function GetPlayers(pageNumber) {
    return http.get(`${playersApi}/${pageNumber}`)
}