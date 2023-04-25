import { Inter } from 'next/font/google'
import React from 'react'
import styles from '../styles/Home.module.css';
import moment from 'moment-timezone';
import Image from 'next/image';
import WeeklyThreeHourForcast from './WeeklyThreeHourForcast'
const inter = Inter({ subsets: ['latin'] })
export default function WeeklyWeather({data, threeHourWeather, weeklyWeather, timezone, dataForcast}) {
    console.log(data);console.log(threeHourWeather);
  return (
    <main className={`${styles.main} ${inter.className}`}>
    <div className={styles.weeklyWeatherContainer}>
      <h3>Weekly <span>Weather</span></h3>
      {weeklyWeather.length > 0 && 
      weeklyWeather.map((weather, index) => {
        if(index == 0){
           return; 
        }
        return(

            <div className={styles.weeklyWeatherCard} key={weather.dt}>
                <div className={styles.weeklyWeatherRow}>
                    <div className={styles.weeklyWeatherCol}>
                            <h3 className={styles.weeklyForcastDay}>{moment.unix(weather.dt).tz(timezone).format("dddd")}</h3>
                            <h4 className={styles.weeklyForcastDescription}>{weather.weather[0].description}</h4>
                            <h4 className={styles.weeklyForcastHL}><span>High: </span> {weather.temp.max.toFixed(0)}&deg;F <span>Low: </span> {weather.temp.min.toFixed(0)}&deg;F</h4>
                    </div>
                    <div className={styles.weeklyForcastIconCol}>
                        <Image 
                        className={styles.todaysForcastIconWrapper} 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                        alt="Weather Image Icon" layout="fill" />
                    </div>
                </div>
            </div>
       
        )  
      } )
   }  
   </div></main>
    )
}
