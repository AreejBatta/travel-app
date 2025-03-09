export function updatWeatherUI(weatherD, rDays){
    const weatherElement= document.querySelector('.weather');
    const min_temp= document.querySelector('.minTemp');
    const max_temp= document.querySelector('.maxTemp');

        if (rDays<8){
            weatherElement.innerHTML= `Tempreature: ${weatherD.temp} °C </br>  Weather: ${weatherD.description}`
        }
        else if (rDays>7){
            weatherElement.innerHTML= `Tempreature: ${weatherD.temp} °C </br>  Weather: ${weatherD.description}`
            min_temp.innerHTML= `Low: ${weatherD.app_min_temp} °C`;
            max_temp.innerHTML=`High: ${weatherD.app_max_temp} °C`
            
        }
    }
