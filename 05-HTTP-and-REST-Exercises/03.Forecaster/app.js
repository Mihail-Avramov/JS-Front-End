function attachEvents() {
    const locationsURL = "http://localhost:3030/jsonstore/forecaster/locations";
    const weatherURL = "http://localhost:3030/jsonstore/forecaster/today/";
    const forecastURL = "http://localhost:3030/jsonstore/forecaster/upcoming/";

    const specialSymbols = {
        Sunny: " ☀",
        "Partly sunny": "⛅",
        Overcast: "☁",
        Rain: "☂",
        Degrees: "°",
    };

    const locationInput = document.getElementById("location");
    const submitBtn = document.getElementById("submit");
    const forecastDiv = document.getElementById("forecast");
    submitBtn.addEventListener("click", getWeatherData);

    async function getWeatherData() {
        forecastDiv.style.display = "block";
        const location = locationInput.value;
        locationInput.value = "";
        try {
            const locationsResponse = await fetch(locationsURL);
            const locationsData = await locationsResponse.json();
            const locationId = locationsData.find((l) => l.name === location).code;
            const weatherResponse = await fetch(weatherURL + locationId);
            const weatherData = await weatherResponse.json();
            const forecastResponse = await fetch(forecastURL + locationId);
            const forecastData = await forecastResponse.json();
            currentWeather(weatherData);
            forecast(forecastData);
        } catch (error) {
            const currentWeatherDiv = document.getElementById("current");
            currentWeatherDiv.innerHTML = `<div class="label">Error</div>`;
            const upcomingWeatherDiv = document.getElementById("upcoming");
            upcomingWeatherDiv.innerHTML = `<div class="label">Error</div>`;
        }
    }

    function currentWeather(weatherData) {
        const cityName = weatherData.name;
        const condition = weatherData.forecast.condition;
        const specialSymbol = specialSymbols[condition];
        const lowTemperature = weatherData.forecast.low + specialSymbols.Degrees;
        const highTemperature = weatherData.forecast.high + specialSymbols.Degrees;
        const currentWeatherDiv = document.getElementById("current");
        currentWeatherDiv.innerHTML = `<div class="label">Current conditions</div>`;
        const divClassForecasts = generateElement("div", "", currentWeatherDiv, "", ["forecasts"]);
        generateElement("span", `${specialSymbol}`, divClassForecasts, "", ["condition", "symbol"]);
        const spanCondition = generateElement("span", "", divClassForecasts, "", ["condition"]);
        generateElement("span", `${cityName}`, spanCondition, "", ["forecast-data"]);
        generateElement("span", `${lowTemperature}/${highTemperature}`, spanCondition, "", ["forecast-data"]);
        generateElement("span", `${condition}`, spanCondition, "", ["forecast-data"]);
    }

    function forecast(forecastData) {
        console.log(forecastData);

        const upcomingWeatherDiv = document.getElementById("upcoming");
        upcomingWeatherDiv.innerHTML = `<div class="label">Three-day forecast</div>`;
        const divClassForecasts = generateElement("div", "", upcomingWeatherDiv, "", ["forecast-info"]);

        forecastData.forecast.forEach((day) => {
            const condition = day.condition;
            const specialSymbol = specialSymbols[condition];
            const lowTemperature = day.low + specialSymbols.Degrees;
            const highTemperature = day.high + specialSymbols.Degrees;

            const divClassUpcoming = generateElement("div", "", divClassForecasts, "", ["upcoming"]);
            generateElement("span", `${specialSymbol}`, divClassUpcoming, "", ["symbol"]);
            generateElement("span", `${lowTemperature}/${highTemperature}`, divClassUpcoming, "", ["forecast-data"]);
            generateElement("span", `${condition}`, divClassUpcoming, "", ["forecast-data"]);
        });
    }

    function generateElement(type, textContent, parent, id, classesArray, attributesObj) {
        //"HTML-TAG"
        const element = document.createElement(type);

        //"text or value content"
        if (textContent) {
            if (type !== "input" && type !== "textarea") {
                element.textContent = textContent;
            } else {
                element.value = textContent;
            }
        }

        // "idName"
        if (id) {
            element.id = id;
        }

        // ["className1", "className2", ...]
        if (classesArray) {
            classesArray.forEach((className) => {
                element.classList.add(className);
            });
        }

        //{src: "link to img", href: "link to site", type: "checkbox", row: 20}
        if (attributesObj) {
            Object.entries(attributesObj).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        // append HTMLelement to HTMLparent
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}

attachEvents();
