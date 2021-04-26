const API_URL = process.env.API_URL;

export async function covidData() {
    const response = await fetch(`${API_URL}/api/data`);
    console.log(response);
    return response.json();
}

export async function covidRule() {
    const response = await fetch(`${API_URL}/api/rules`);
    return response.json();
}