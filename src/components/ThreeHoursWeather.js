import React from 'react'
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import moment from 'moment-timezone';

export default function ThreeHoursWeather({threeHourWeather, timezone}) {
    console.log(threeHourWeather);
    return (
    <div className={styles.threeHourWeather}>
     <div className={styles.threeHourWeatherWrapper}>
        {threeHourWeather.length > 0 && threeHourWeather.map((weather, index) => (
        <div className={styles.threeHourWeatherBoxWrapper} key={weather.dt}>
            <div className={styles.threeHourWeatherCard}>
                <span className={`threeHourWeatherTime ${index == 0 ? 'threeHourTimeNow' :''}`}>
                    {index == 0 ? ("Now") : moment.unix(weather.dt).tz(timezone).format("LT")}
                </span>
                <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width="100" height="100" />
                <span>{weather.temp.toFixed()}&deg;F</span>
            </div>
        </div>
        ))}
     </div>
      
    </div>
  );
}
