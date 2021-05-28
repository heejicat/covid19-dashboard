const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://merncovid19dashboard.herokuapp.com'

// fetching API from back-end
export async function covidData() {
    const response = await fetch(`${API_URL}/api/data`);
    return response.json();
}

export async function covidRule() {
    const response = await fetch(`${API_URL}/api/rules`);
    return response.json();
}