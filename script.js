var apiKey = 'f9cdcd2c3b7719707a853149c7dca305';
//http://api.openweathermap.org/data/2.5/forecast?q=doral&appid=f9cdcd2c3b7719707a853149c7dca305
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var images = [];

async function setData(query) {
    fetch(query).then(response => response.json())
    .then(data =>{
        try{
            images[0].src = 'https://openweathermap.org/img/wn/'+ data.list[0].weather[0].icon + '.png';
        }catch(e){
            console.log(e);
        }
    
})
}

function searchBtn(){
    const newCity = document.getElementById('citySearch');
    const newName = newCity.value;

    const queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q='+ newName +'&appid='+ apiKey
    cityName.innerHTML = capitalizeFirstLetter(newCity.value);
    setData(queryURL);
}

window.onload = function() {
    for(i = 1; i <= 6; i++) {
        images.push(document.getElementById('pic'+i));
    }
}