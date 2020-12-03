import http from './httpService';
import config from '../config.json';

const userApi = config.API + 'user/';

export function GetUsers(number){
    return http.get(`${userApi}/${number}`);
}