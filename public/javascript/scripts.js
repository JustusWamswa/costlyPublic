
document.getElementById("footer").innerHTML = ` &copy; ${new Date().getFullYear()} Costly`;

// ======================================== side bar ================================================
const sideNav = document.querySelector('.sideNav')
const barIcon = document.querySelector('.bIcon')
const closeIcon = document.querySelector('.closeIcon')
barIcon.addEventListener('click', () => {
    sideNav.style.display = 'flex'
})
closeIcon.addEventListener('click', () => {
    sideNav.style.display = 'none'
})


const userInput1 = document.getElementById("city1");
const userInput2 = document.getElementById("city2");
const compareBtn = document.getElementById("compareBtn");

let map1, map2, searchManager;
const categories = [];
const buyApartment = [];
const childcare = [];
const clothingAndShoes = [];
const markets = [];
const rentPerMonth = [];
const restaurants = [];
const salariesAndFinancing = [];
const sportsAndLeisure = [];
const transportation = [];
const utilitiesPerMonth = [];

//================================== fetch country data from server =====================================

const data = () => {
    

    fetch('/countryFacts')
        .then(response => response.json())
        .then((response) => {
            //console.log('from server',response)

            var dateOfEvent = new Date();
            var dd = String(dateOfEvent.getDate()).padStart(2, '0');
            var mm = String(dateOfEvent.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = dateOfEvent.getFullYear();
            dateOfEvent = mm + '/' + dd + '/' + yyyy;

            localStorage.setItem("dateOfEvent", dateOfEvent);

            localStorage.setItem("responses", JSON.stringify(response));
        })
        .catch(err => console.error(err)
        );
}

// =================================== fetch cost of living data from server ==================================================

const costOfLiving = () => {

    // fetch(`/costOfLiving/${city},${country}`)
    fetch('/costOfLiving')
        .then(response => response.json())
        .then(response => { localStorage.setItem("responses2", JSON.stringify(response)); })
        .catch(err => console.error(err));
}

// ==== when the homepage loads, fetch data if it is not in the localStorage
// ==== else check difference in days since data was last loaded to localstorage
if (localStorage.getItem("responses") === null || localStorage.getItem("responses2") === null) {

    data();
    costOfLiving();

} else {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    var dateOfEvent = localStorage.getItem("dateOfEvent");

    const date1 = new Date(today);
    const date2 = new Date(dateOfEvent);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //console.log("dateOfEvent", localStorage.getItem("dateOfEvent"))
    //console.log("today", today)
    //console.log("difference", diffDays)

    if (diffDays > 365) {
        localStorage.clear();
        data();
        costOfLiving();
    }

}

//================================== auto complete functionality =====================================

const countryResponse = JSON.parse(localStorage.getItem("responses"));
const focusEvent = () => {
    let cities = [];
    countryResponse.forEach(country => {
        const countryName = country.name.common;
        const cityAndCountry = { City: (Object.values(country.capital).toString().split(",").join(", ")), Country: (countryName) };
        cities.push(cityAndCountry);
    })

    // ==== sort names of cities in ascending order ===
    let sortedCities = cities.sort((a, b) => {
        let ca = a.City.toLowerCase(),
            cb = b.City.toLowerCase();

        if (ca < cb) {
            return -1;
        }
        if (ca > cb) {
            return 1;
        }
        return 0;
    });

    //console.log(sortedCities);

    // ====Execute on keyup ====
    userInput1.addEventListener("keyup", (e) => {
        //initially, if user adds or erases a letter then clean previous outputs
        removeElements();
        // loop through the sortedCities array
        sortedCities.forEach((e) => {
            //console.log(`${e.City} ${e.Country}`);
            //convert userInput1 to lowercase and compare with each string
            if (`${e.City}`.toLowerCase().startsWith(userInput1.value.toLowerCase()) && userInput1.value != "") {
                //create li element
                let listElement = document.createElement("li");
                //add to a common class name
                listElement.classList.add("listElements");
                listElement.style.cursor = "pointer";
                listElement.addEventListener("click", () => {
                    userInput1.value = `${e.City}`;
                    removeElements();
                });
                //display match in bold
                let word = "<b>" + `${e.City}`.substring(0, userInput1.value.length) + "</b>";
                word += `${e.City}`.substring(userInput1.value.length);
                //console.log(word);
                //display the value in array
                listElement.innerHTML = word;
                document.querySelector(".list").appendChild(listElement);
            }
        });
    })
    userInput2.addEventListener("keyup", (e) => {
        //initially, if user adds or erases a letter then clean previous outputs
        removeElements();
        // loop through the sortedCities array
        sortedCities.forEach((e) => {
            //console.log(`${e.City} ${e.Country}`);
            //convert userInput2 to lowercase and compare with each string
            if (`${e.City}`.toLowerCase().startsWith(userInput2.value.toLowerCase()) && userInput2.value != "") {
                //create li element
                let listElement = document.createElement("li");
                //add to a common class name
                listElement.classList.add("listElements");
                listElement.style.cursor = "pointer";
                listElement.addEventListener("click", () => {
                    userInput2.value = `${e.City}`;
                    removeElements();
                });
                //display match in bold
                let word = "<b>" + `${e.City}`.substring(0, userInput2.value.length) + "</b>";
                word += `${e.City}`.substring(userInput2.value.length);
                //console.log(word);
                //display the value in array
                listElement.innerHTML = word;
                document.querySelector(".list").appendChild(listElement);
            }
        });
    })
}


const removeElements = () => {
    //clear all the cities
    let cities = document.querySelectorAll(".listElements");
    cities.forEach((city) => {
        city.remove();
    })
}


//================================== add country data to document =====================================
// countryResponse.forEach(country => {

//     const countryName = country.name.common;
//     const cityName1 = country.capital;
//     const cityName2 = country.capital;
//     if (userInput1.value == "" || userInput2.value == "") {
//         alert("Fill all the entries to compare")
//     } else if (cityName != userInput1.value && cityName != userInput2.value) {
//         alert("Cities entered do not exist")
//     } else if (cityName != userInput1.value && userInput1.value != "") {
//         alert("City in the first entry does not exist")
//     } else if (cityName != userInput2.value && userInput2.value != "") {
//         alert("City in the second entry does not exist")
//     } else {}

// });
const dataLoad1 = () => {
    countryResponse.forEach(country => {
        const countryName = country.name.common;
        const cityName1 = country.capital;
        if (cityName1 == userInput1.value) {
            document.getElementById("nameOfCountry_city1").innerHTML = countryName;
            document.getElementById("flagOfCountry_city1").style.backgroundImage = `url(${country.flag})`;
            document.getElementById("capitalCityOfCountry_city1").innerHTML = Object.values(country.capital).toString().split(",").join(", ");
            document.getElementById("latitudeOfCountry_city1").innerHTML = country.latlng[0];
            document.getElementById("longitudeOfCountry_city1").innerHTML = country.latlng[1];
            document.getElementById("populationOfCountry_city1").innerHTML = country.population;
            document.getElementById("languagesOfCountry_city1").innerHTML = Object.values(country.languages).toString().split(",").join(", ");
            document.getElementById("subRegionOfCountry_city1").innerHTML = country.subregion;
            document.getElementById("currencyOfCountry_city1").innerHTML = country.currencies[Object.keys(country.currencies)].name;
            document.getElementById("currencySymbolOfCountry_city1").innerHTML = Object.keys(country.currencies)[0];
        }
    });
}
const dataLoad2 = () => {
    countryResponse.forEach(country => {
        const countryName = country.name.common;
        const cityName2 = country.capital;
        if (cityName2 == userInput2.value) {
            document.getElementById("nameOfCountry_city2").innerHTML = countryName;
            document.getElementById("flagOfCountry_city2").style.backgroundImage = `url(${country.flag})`;
            document.getElementById("capitalCityOfCountry_city2").innerHTML = Object.values(country.capital).toString().split(",").join(", ");
            document.getElementById("latitudeOfCountry_city2").innerHTML = country.latlng[0];
            document.getElementById("longitudeOfCountry_city2").innerHTML = country.latlng[1];
            document.getElementById("populationOfCountry_city2").innerHTML = country.population;
            document.getElementById("languagesOfCountry_city2").innerHTML = Object.values(country.languages).toString().split(",").join(", ");
            document.getElementById("subRegionOfCountry_city2").innerHTML = country.subregion;
            document.getElementById("currencyOfCountry_city2").innerHTML = country.currencies[Object.keys(country.currencies)].name;
            document.getElementById("currencySymbolOfCountry_city2").innerHTML = Object.keys(country.currencies)[0];
        }
    });
}




compareBtn.addEventListener('click', () => {
    dataLoad1();
    dataLoad2();

    //================================== display results =====================================
    //document.querySelector(".results").style.display = "grid";

    //================================== display results =====================================
    document.querySelector('main').style.position = 'relative';

    //=========== Bing 1s map2, ===================
    map1.entities.clear();
    map2.entities.clear();
    geocodeQuery1(userInput1.value);
    geocodeQuery2(userInput2.value);

})

//==================================================== Bing maps ======================================================


function getMap() {
    map1 = new Microsoft.Maps.Map(document.getElementById("map1"), { zoom: 10 });
    map2 = new Microsoft.Maps.Map(document.getElementById("map2"), { zoom: 10 });
};

function geocodeQuery1(query) {
    if (!searchManager) {
        Microsoft.Maps.loadModule("Microsoft.Maps.Search", function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map1);
            geocodeQuery1(query);
        });
    } else {
        let searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location, {
                        icon: "../images/smallpin.png",
                        anchor: new Microsoft.Maps.Point(12, 39),
                    });
                    map1.entities.push(pin);
                    map1.setView({ bounds: r.results[0].bestView });
                };
            },
            errorCallback: function (e) {
                alert("No result found");
            }
        };
        searchManager.geocode(searchRequest);
    };
};

function geocodeQuery2(query) {
    if (!searchManager) {
        Microsoft.Maps.loadModule("Microsoft.Maps.Search", function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map2);
            geocodeQuery2(query);
        });
    } else {
        let searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location, {
                        icon: "../images/smallpin.png",
                        anchor: new Microsoft.Maps.Point(12, 39),
                    });
                    map2.entities.push(pin);
                    map2.setView({ bounds: r.results[0].bestView });
                };
            },
            errorCallback: function (e) {
                alert("No result found");
            }
        };
        searchManager.geocode(searchRequest);
    };
};




// ========================================================= chart from chartjs =======================================================
// == get all the categories and prices ====
const costResponse = JSON.parse(localStorage.getItem("responses2"));
costResponse.prices.forEach(price => {
    const allVar = price.category_name;
    categories.push(allVar);
    // == skip the data without usd avg == 
    if (price.measure !== "percent") {
        const allPrices = parseFloat(price.usd.avg);

        if (allVar == "Buy Apartment") {
            buyApartment.push(allPrices)
        } else if (allVar == "Childcare") {
            childcare.push(allPrices)
        } else if (allVar == "Clothing And Shoes") {
            clothingAndShoes.push(allPrices)
        } else if (allVar == "Markets") {
            markets.push(allPrices)
        } else if (allVar == "Rent Per Month") {
            rentPerMonth.push(allPrices)
        } else if (allVar == "Restaurants") {
            restaurants.push(allPrices)
        } else if (allVar == "Salaries And Financing") {
            salariesAndFinancing.push(allPrices)
        } else if (allVar == "Sports And Leisure") {
            sportsAndLeisure.push(allPrices)
        } else if (allVar == "Transportation") {
            transportation.push(allPrices)
        } else if (allVar == "Utilities Per Month") {
            utilitiesPerMonth.push(allPrices)
        }
    }
})

// == remove duplication in categories == 
const uniqueCategories = [...new Set(categories)];
//console.log(uniqueCategories);

// == median function ==
const median = (arr) => {
    const numbers = [...arr].sort((a, b) => { return a - b });
    const midValue = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? numbers[midValue] : (numbers[midValue - 1] + numbers[midValue]) / 2;
}

const buyApartmentMedian = median(buyApartment);
const childcareMedian = median(childcare);
const clothingAndShoesMedian = median(clothingAndShoes);
const marketsMedian = median(markets);
const rentPerMonthMedian = median(rentPerMonth);
const restaurantsMedian = median(restaurants);
const salariesAndFinancingMedian = median(salariesAndFinancing);
const sportsAndLeisureMedian = median(sportsAndLeisure);
const transportationMedian = median(transportation);
const utilitiesPerMonthMedian = median(utilitiesPerMonth);
const medianValues = [buyApartmentMedian, childcareMedian, clothingAndShoesMedian, marketsMedian, rentPerMonthMedian,
    restaurantsMedian, salariesAndFinancingMedian, sportsAndLeisureMedian, transportationMedian, utilitiesPerMonthMedian
];

const medianValues2 = [medianValues[0] * 2,
medianValues[1] * 2,
medianValues[2] * 2,
medianValues[3] * 2,
medianValues[4] * 2,
medianValues[5] * 2,
medianValues[6] * 2,
medianValues[7] * 2,
medianValues[8] * 2,
medianValues[9] * 2
]

// ============ update chart based on user preference ===============
for (let i = 0; i < uniqueCategories.length; i++) {
    document.getElementById(`param${i}`).innerHTML = `&emsp;${uniqueCategories[i]}`
}

function updateChecker () {
    for (let i = 0; i < uniqueCategories.length; i++) {
        document.getElementById(`check${i}`).appendChild = uniqueCategories[i]
        if(document.getElementById('checkAll').checked == true) {
            document.getElementById(`check${i}`).checked = true
        } else {
            document.getElementById(`check${i}`).checked = false   
        }
    }   
}


const ctx = document.getElementById("chart").getContext('2d');
Chart.defaults.font.weight = 'light';
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: uniqueCategories,
        datasets: [
            {
                label: 'city1',
                data: medianValues,
                backgroundColor: [
                    'rgba(137, 5, 241, 1)'
                ],
                borderColor: [
                    'rgba(137, 5, 241, 1)',
                ],
                borderWidth: 2
            },
            {
                label: 'city2',
                data: medianValues2,
                backgroundColor: [
                    'rgba(42, 37, 64, 1)'
                ],
                borderColor: [
                    'rgba(42, 37, 64, 1)',
                ],
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'A line chart showing the median price of each category',
                font: {
                    weight: 900
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    color: 'rgba(0, 0, 0, 1)',
                    text: 'Categories',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    color: 'rgba(0, 0, 0, 1)',
                    text: 'Price in USD',
                    font: {
                        weight: 'bold'
                    }
                },
                ticks: {
                    display: true,
                    beginAtZero: false,
                    backdropPadding: {
                        x: 20,
                        y: 20
                    }
                }
            }
        }
    }
})

//============================================ data in tabular form =======================================================
for (let i = 0; i < uniqueCategories.length; i++) {
    document.getElementById(`category${i}`).innerHTML = uniqueCategories[i];
    document.getElementById(`data${i}City1`).innerHTML = "$ " + (medianValues[i].toFixed(2));
    document.getElementById(`data${i}City2`).innerHTML = "$ " + (medianValues[i].toFixed(2));
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", `chart${i}`);
    canvas.setAttribute("class", "canvas2");
    document.getElementById(`comparison${i}`).appendChild(canvas);

    let ctx = document.getElementById(`chart${i}`).getContext('2d')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
                {
                    label: 'city1',
                    data: [medianValues[i]],
                    backgroundColor: [
                        'rgba(137, 5, 241, 1)'
                    ],
                    borderColor: [
                        'rgba(137, 5, 241, 1)',
                    ],
                    borderWidth: 2
                },
                {
                    label: 'city2',
                    data: [medianValues2[i]],
                    backgroundColor: [
                        'rgba(42, 37, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(42, 37, 64, 1)',
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            plugins:{
                legend: {
                    display: false
                }
            },
            responsive: true,
            scales: {
                x: {
                     display: false,
                 },
                y: {
                    display: false,
                 }
            }
        }
    })

}
