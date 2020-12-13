import http from './httpService';
import config from '../config.json';

const userApi = config.API + 'user/';
const authApi = config.API + 'auth/';

export function GetUsers(number) {
    return http.get(`${userApi}/${number}`);
}
export function PostUser(user) {
    return http.post(`${userApi}`, user);
}

export function LoginUser(user) {
    return http.post(`${authApi}`, {
        email: user.email,
        password: user.password
    });
}
