let weather = {
    "apiKey": "04ccb2abf86fe71a517e643cd31939b4",
    fetchWeather: function (city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".weather-city").innerText = "Weather in " + name;
        document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".weather-description").innerText = description;
        document.querySelector(".weather-temp").innerText = temp.toFixed(1) + "°C";
        document.querySelector(".weather-humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".weather-wind").innerText = "Wind speed: " + speed.toFixed(1) + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Kyiv");