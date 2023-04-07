const express = require('express')
const fetch = require('node-fetch');
const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`))
app.use(express.static('public'))

require('dotenv').config()

//================================== create endpoint to fetch country data from api =====================================
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.COUNTRIES_API_KEY,
        'X-RapidAPI-Host': 'country-facts.p.rapidapi.com'
    }
};
app.get('/countryFacts', async (request, response) => {
    const apiUrl = 'https://country-facts.p.rapidapi.com/all'
    const fetchResponse = await fetch(apiUrl, options)
    const json = await fetchResponse.json()
    response.json(json)
})

// ===================================create endpoint to fetch cost of living data from api ==================================================

const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.COST_OF_LIVING_API_KEY,
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
    }
};
app.get('/costOfLiving', async (request, response) => {
    const apiUrl = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Bratislava&country_name=Slovakia'
    const fetchResponse = await fetch(apiUrl, options1)
    const json = await fetchResponse.json()
    response.json(json)
})

// const options1 = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': process.env.COST_OF_LIVING_API_KEY,
//         'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
//     }
// };
// app.get('/costOfLiving/:city_country_name', async (request, response) => {
//     const cityCountry = request.params.city_country_name.split(',)
//     const city = cityCountry[0]    
//     const country = cityCountry[1]    
//     const apiUrl = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city}&country_name=${country}`
//     const fetchResponse = await fetch(apiUrl, options1)
//     const json = await fetchResponse.json()
//     response.json(json)
// })