import {useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const API_KEY = `5f6ce91179f9a3dcbf7e7dc3ad5f090a`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`

    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            axios.get(url).then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            searchLocation('')
        }
    }

    return (
        <div className="App">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text"/>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}

                    </div>
                    <div className="description">
                        {data.weather && <p>{data.weather[0].main}</p>}

                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main && <p className="bolt">{data.main.feels_like.toFixed()}°C</p>}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main && <p className="bolt"> {data.main.humidity}%</p>}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind && <p className="bolt">{data.wind.speed.toFixed()} MPH</p>}
                            <p>Wind Speed</p>
                        </div>
                    </div>}


            </div>
        </div>
    );
}

export default App;
