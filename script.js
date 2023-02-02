//http://api.openweathermap.org/data/2.5/forecast?q=doral&appid=f9cdcd2c3b7719707a853149c7dca305
var API_KEY = 'efac0c5ae10df832cb270d2cfe59ddc8';

// A Persistent list of the cities the user has searched for
var searchedCities = [];

// Arrays of the elements within the document that change.
const cityName = document.getElementById('cityName');
const images =[];
const temps = [];
const winds = [];
const humidity = [];

// Fills the arrays with th eproper elements.
for(i=0; i<6;i++){
    images.push(document.getElementById('pic'+(i+1)));
    temps.push(document.getElementById('temp'+(i+1)));
    winds.push(document.getElementById('wind'+(i+1)));
    humidity.push(document.getElementById('humidity'+(i+1)));
}
// Proper capitalization of the city name
function capitalizeFirstLetter(word) {
    word = word.toString();
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Button click function
function getForecast(newName){
    cityName.textContent = capitalizeFirstLetter(newName);
    // creates the query
    const queryUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ newName.toLowerCase() +'&appid='+ API_KEY + '&units=imperial'
    // this creates a promise, converts it into a json object, then retrieves the data necessary.
    fetch(queryUrl).then(response => response.json()).then(data =>{
        for(i=0;i<6;i++){
            images[i].src = 'http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon +'@2x.png';
            temps[i].textContent = 'Temp: ' + data.list[i].main.temp + ' °F';
            winds[i].textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
            humidity[i].textContent = 'Humidity: ' + data.list[i].main.humidity +' %';
        }
    });

    //Persists the data and updates the list
    updateHistory(newName);
}

function updateHistory(string){
    if(!historyContains(string)){
        searchedCities.push(string);
        localStorage.setItem('cityHistory', searchedCities);
        addButton(string);
    }
}

// Used to not allow duplicates
function historyContains(word){
    var result = true;
    searchedCities.forEach(name =>{
        if(name == word){
            result = false;
        }
    })
    return result;
}

// to be called onload event, loads history
function updateButtons(){
    for(i=0; i< searchedCities.length; i++){
        addButton(searchedCities[i]);
    }
}

function addButton(word){
    const historyDiv =  document.getElementById('history');

    const newButton = document.createElement("BUTTON");
    newButton.textContent = word;
    newButton.class = 'btn text-bg-gray'
    newButton.onclick = getForecast(word);
    
    historyDiv.appendChild();
}

window.onload = (event) => {
    var storedInput = localStorage.getItem('cityHistory');
    if(storedInput!= null){
        searchedCities = storedInput.split(',');
    }
};

