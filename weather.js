const button = document.getElementById('getloc');
const result = document.getElementById('result'); // Assuming there's an element with id 'result' in your HTML

async function getData(lat, long) {
    try {
        const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=967b79616f4148bf973180351230312&q=${lat},${long}&aqi=yes`
            );
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        data = data.location.name;

        return data; // Return the temperature data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function gotLocation(position) {
    try {
        let place = await getData(position.coords.latitude, position.coords.longitude);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=5b4bee0ba241d092159faf007e166080`).then(response => response.json()).then(out => displayData(out))
        function displayData(dataArray){
        const temperatureKelvin = dataArray.main.temp;
    
    // Convert Kelvin to Celsius
    const temperatureCelsius = Math.round(temperatureKelvin - 273.15)
    const humidity = dataArray.main.humidity;
    const wind = dataArray.wind.speed; 
    const cloud=dataArray.weather[0].main;
    const plac=dataArray.name;
    pl.innerHTML=`<h5>${plac}</h5>`
    hu.innerHTML=`<i class="fa-solid fa-droplet fa-lg" style="color: #73b5f2;"></i> humidity:${humidity}%`
    temp.innerHTML=`<h1>${temperatureCelsius}°C</h1>`
    cl.innerHTML=`<h5><i class="fa-solid fa-cloud fa-lg" style="color: #76cdf9;"></i> ${cloud}</h5>`
    wi.innerHTML=`<i class="fa-solid fa-wind fa-lg" style="color: #6eb2f2;"></i>  wind:${wind}km/h`
      }
    } catch (error) {
        console.error('Error getting location:', error);
        // Handle the error as needed
    }
}

function failedToGet() {
    console.log('There was some issue');
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

button.addEventListener('touchstart', async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});