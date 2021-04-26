// const API_URL = 'http://localhost:3001';
const API_URL = 'https://merncovid19dashboard.herokuapp.com/';

export async function covidData() {
    const response = await fetch(`${API_URL}/api/data`);
    console.log(response);
    return response.json();
}

export async function covidRule() {
    const response = await fetch(`${API_URL}/api/rules`);
    return response.json();
}