// Clé API pour OpenWeatherMap
const apiKey = "YOUR_API_KEY_HERE";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Éléments du DOM
const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Écouteurs d'événements
searchBtn.addEventListener("click", () => {
    getWeatherData(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeatherData(searchBox.value);
    }
});

// Fonction pour récupérer les données météo
async function getWeatherData(cityName) {
    try {
        if (!cityName) return;

        // Construction de l'URL avec les paramètres séparés pour plus de clarté
        const url = `${apiUrl}?q=${cityName}&units=metric&lang=fr&appid=${apiKey}`;
        console.log("URL de l'API:", url); // Pour debug
        
        const response = await fetch(url);
        
        // Afficher le statut de la réponse pour debug
        console.log("Statut de la réponse:", response.status);
        
        // Gestion de ville non trouvée
        if (response.status === 404) {
            city.textContent = "Ville non trouvée";
            temperature.textContent = "--°C";
            description.textContent = "--";
            humidity.textContent = "--%";
            windSpeed.textContent = "-- km/h";
            weatherIcon.src = "";
            return;
        }
        
        const data = await response.json();
        console.log("Données reçues:", data); // Pour debug
        
        // Mise à jour du DOM avec les données météo
        city.textContent = `Météo à ${data.name}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        
        // Définir l'icône météo en fonction des conditions météo
        setWeatherIcon(data.weather[0].main);
        
        // Effacer le champ de saisie
        searchBox.value = "";
        
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo:", error);
        city.textContent = "Erreur lors de la récupération des données";
    }
}

// Fonction pour définir l'icône météo
function setWeatherIcon(weatherMain) {
    switch(weatherMain) {
        case "Clear":
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
            break;
        case "Clouds":
            weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
            break;
        case "Rain":
        case "Drizzle":
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
            break;
        case "Mist":
        case "Fog":
        case "Haze":
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
            break;
        case "Snow":
            weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
            break;
        case "Thunderstorm":
            weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
            break;
        default:
            weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png";
    }
}

// Tester directement l'API au chargement pour debug
window.addEventListener("load", () => {
    console.log("Application météo chargée");
    // Test direct de l'API avec Paris
    testAPI();
    // Charger la météo de Paris par défaut
    getWeatherData("Paris");
});

// Fonction de test pour vérifier l'API
async function testAPI() {
    try {
        const testUrl = `${apiUrl}?q=Paris&units=metric&lang=fr&appid=${apiKey}`;
        console.log("Test API URL:", testUrl);
        
        const response = await fetch(testUrl);
        console.log("Test API statut:", response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log("Test API réussi:", data);
        } else {
            console.error("Test API échoué avec statut:", response.status);
        }
    } catch (error) {
        console.error("Test API erreur:", error);
    }
}
