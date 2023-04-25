import React from 'react'
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import moment from 'moment-timezone';

export default function WeeklyThreeHourForcast({dataForcast}) {
    console.log('dataForcast', dataForcast);
    var dataWF = dataForcast.list;
  return (
    <div>
      <h1>WEEKLY THREE HOUR FORCAST</h1>
      <div className={styles.threeHourWeather}>
     <div className={styles.threeHourWeatherWrapper}>
        {dataWF.length > 0 && dataWF.map((item) => (
        <div className={styles.threeHourWeatherBoxWrapper} key={item.dt_txt}>
            <div className={styles.threeHourWeatherCard}><span>{item.dt_txt}</span>
               
            <Image src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} width="100" height="100" />
                 <span>{((item.main.temp.toFixed() - 273.15) * 9/5 + 32).toFixed()}&deg;F</span>
            </div>
        </div>
        ))}
     </div>
      
    </div>
    </div>
  )
}
