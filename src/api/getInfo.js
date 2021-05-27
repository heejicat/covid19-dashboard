const axios = require('axios');
const cheerio = require('cheerio');

const page_case = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/arcgis/rest/services/COVID19_Cases_by_BC_Health_Authority/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22NewCases%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true';
const page_restriction = 'https://www2.gov.bc.ca/gov/content/covid-19/info/restrictions';


async function getCovidData() {
    // Request HTTP as JSON
    const { data } = await axios.get(page_case);
    const $ = cheerio.load(data);

    //const date = $('body > div > div > div > div.flex-fluid.flex-horizontal.position-relative.overflow-hidden > div > div > div > margin-container > full-container > div:nth-child(36) > margin-container > full-container > div > div.widget-body.flex-fluid.full-width.flex-vertical.justify-content-center.overflow-hidden > div > div > svg > g.responsive-text-label > text')

    console.log($);
    // New cases number selector
    const newCases = data.features[0]['attributes']['value'];

    const dateFormat = {year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    // Save new cases number and date
    const covidData = {
        new_cases: newCases,
        date: today.toLocaleDateString("en-US", dateFormat)
    }
    
    return covidData;
}

async function getRegulation() {
    // Request HTTP as JSON
    const { data } = await axios.get(page_restriction);
    // Define $ to use data like jQuery
    const $ = cheerio.load(data);

    // Restriction html Div selector
    const restriction = $("#body").html();

    // html last updated date selector
    const dateSelector = $("#body > p:nth-child(1) > strong")[0].children[0].data;
    const updatedDate = dateSelector.substring(0, dateSelector.indexOf(","))

    // Save html and last updated date
    const regulation = {
        restriction : restriction,
        date : dateSelector,
    };
    
    return regulation;
}    

module.exports = {
    getCovidData,
    getRegulation
};