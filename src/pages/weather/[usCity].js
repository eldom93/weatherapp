import React from 'react';
import USCities from '../../../lib/USCities.json';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import TodaysWeatherForcast from '../../components/TodaysWeatherForcast';
import moment from 'moment-timezone';
import ThreeHoursWeather from '../../components/ThreeHoursWeather';
import WeeklyWeather from '../../components/WeeklyWeather';
import WeeklyThreeHourForcast from '../../components/WeeklyThreeHourForcast';
export async function getServerSideProps(context){
  const usCity = getUSCity(context.params.usCity);

  console.log(usCity);
  if(!usCity){
    return{
      notFound: true,
    };
  }
  const resForcast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${usCity.latitude}&lon=${usCity.longitude}&appid=${process.env.API_KEY}`);
  const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${usCity.latitude}&lon=${usCity.longitude}&units=imperial&exclude=minutely&appid=${process.env.API_KEY}`);
  const dataResults = await res.json();
  const dataForcastResults = await resForcast.json();
  console.log(dataForcastResults);
  console.log(dataResults);
  if(!dataResults){
  return{
    notFound: true,
  }
} 
if(!dataForcastResults){
  return{
    notFound: true,
  }
} 
  const slug = context.params.usCity;
  return {
    props: {
      dataForcast: dataForcastResults,
      data: dataResults,
      city: usCity,
      timezone: dataResults.timezone,
      currentWeather: dataResults.current,
      dailyWeather: dataResults.daily,
      threeHourWeather: getWeatherInThreeHourIncrements(dataResults.hourly, dataResults.timezone),
    },
  };
}

const getUSCity = (param) => {
  
  const usCityParam = param;
  //  console.log(usCityParam);
  //  console.log(USCities);
  if(!usCityParam){
    return null;
  }
  const usCity = USCities.find(usCity => usCity.zip_code == usCityParam);
  if(usCity){
    return usCity;
  } else{
    return null;
  }
}
const getHourlyFutureWeatherData = (dailyForcastResults,timezone,hourly) => {
  console.log(dailyForcastResults,hourly,timezone);
  // const endOfTomorrow = moment().tz(timezone).endOf("day").valueOf(); 
  // console.log(endOfTomorrow);
}

const getWeatherInThreeHourIncrements = (threeHourlyData, timezone) => {
const endOfDay = moment().tz(timezone).endOf("day").valueOf();
console.log(endOfDay);
const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = threeHourlyData.filter((data) => data.dt < eodTimeStamp);
  const tData = todaysData.filter((data) => {
   return moment.unix(data.dt).tz(timezone).format("LT").includes("12:00") ||  moment.unix(data.dt).tz(timezone).format("LT").includes("3:00") ||  moment.unix(data.dt).tz(timezone).format("LT").includes("6:00") ||  moment.unix(data.dt).tz(timezone).format("LT").includes("9:00") 
  }
    );
  

return tData;

}

export default function USCity({dataForcast, data,city,threeHourWeather,currentWeather,dailyWeather,timezone}) {
  console.log(city);
  console.log(currentWeather);
  console.log(dailyWeather);
  console.log(threeHourWeather);
  console.log(data);

  console.log(dataForcast);
  return (
    <div className={styles.searchBarContainer}>
      <Head>
        <title>Weather Forecast for {city.zip_code} </title>
      </Head>
     <div className={styles.todaysWeatherWrapper}>
      <div className={styles.todaysWeatherContainer}>

        <TodaysWeatherForcast 
          city={city} 
          currentWeather={currentWeather}
          weather={dailyWeather[0]}
          timezone={timezone} 
          />
          <ThreeHoursWeather threeHourWeather={threeHourWeather} timezone={timezone} />
          <WeeklyWeather dataForcast={dataForcast} data={data} threeHourWeather={threeHourWeather} weeklyWeather={dailyWeather} timezone={timezone}/>
          <WeeklyThreeHourForcast dataForcast={dataForcast} />
          
        </div>
     </div>
    
      
   
    </div>
  );
}
