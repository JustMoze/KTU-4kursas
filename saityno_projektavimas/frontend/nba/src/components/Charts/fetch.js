export function myFetch(){
    return fetch('https://nba-modestas.herokuapp.com/players/team/UTA').then((response) => response.json())
}