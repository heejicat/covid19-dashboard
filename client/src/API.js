const API_URL = 'http://localhost:3001';

export async function covidData() {
    const response = await fetch(`${API_URL}/api/data`);
    return response.json();
}

export async function covidRule() {
    const response = await fetch(`${API_URL}/api/rules`);
    return response.json();
}