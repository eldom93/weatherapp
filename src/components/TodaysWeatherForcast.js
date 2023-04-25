import React from 'react'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css';
import moment from 'moment-timezone';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })
export default function TodaysWeatherForcast({city, weather, timezone, currentWeather}) {
    console.log(city);
    console.log(weather);
  return (
    <main className={`${styles.main} ${inter.className}`}>
    <div className={styles.todaysForcastContainer}>
        <h1 className={styles.todaysForcastTitle}>Todays Weather Forecast for</h1>
        <div className={styles.todaysForcastCard}>
            <div className={styles.todaysForcastCol}>
                <h2 className={styles.todaysForcastLocation}> <span>{city.city}, </span><span> {city.state}, </span> <span>{city.zip_code} </span><span> ({city.county} County)</span></h2>
                <h3 className={styles.todaysForcast}>{currentWeather.temp.toFixed(0)}&deg;F</h3>
                <h4 className={styles.todaysForcastDescription}>{weather.weather[0].description}</h4>
                <h4 className={styles.todaysForcastHL}><span>High: </span> {weather.temp.max.toFixed(0)}&deg;F <span>Low: </span> {weather.temp.min.toFixed(0)}&deg;F</h4>
            </div>
            <div className={styles.todaysForcastIconCol}>
          
                    <Image className={styles.todaysForcastIconWrapper} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Image Icon" layout="fill" />
             
            </div>
        </div>
    </div>
    </main>
  )
}
