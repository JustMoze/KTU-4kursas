import jwt from 'jwt-decode';

export function descriptToken(token){
    let decoded = undefined
    try {
       decoded = jwt(token)
    } catch (error) {
        decoded = undefined
    }
    return decoded
}