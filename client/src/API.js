const API_URL = process.env.API_URL;

export async function covidData() {
    console.log(API_URL);
    const response = await fetch(`${API_URL}/api/data`);
    return response.json();
}

export async function covidRule() {
    const response = await fetch(`${API_URL}/api/rules`);
    return response.json();
}