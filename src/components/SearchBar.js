import React from 'react'
import USCities from '../../lib/USCities.json';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  const [possibleResults, setPossibleResults] = React.useState([]);
  const handleChange = (e) =>{
    const { value } = e.target;
    setSearch(value);

    let possibleZipCodes = [];

    if(value.length > 3){
       for(var i = 0; i < USCities.length; i++){
        const zip = USCities[i].zip_code.toString().startsWith(value.toString());
        if(zip){
            const usCityData = {
                ...USCities[i],
                slug:`${USCities[i].zip_code}`
            }
            possibleZipCodes.push(usCityData);
        }
       }
    }
    console.log(possibleZipCodes);
    return setPossibleResults(possibleZipCodes);
  }

  return (
    <div className={styles.searchBarContainer}>
         <h1 className={styles.title}>Weather App</h1>
      <input className={styles.searchBar} onChange={handleChange} type="text" placeholder="Search by Zip Code" value={search} />
      {search.length > 3 && (
        <ul className={styles.searchBarUl}>
            {possibleResults.length > 0 ? (
              possibleResults.map((usCity) => (
                <li className={styles.searchBarLi} key={usCity.slug}>
                    <Link href={`/weather/${usCity.slug}`}>
                      <span>{usCity.zip_code}
                            {usCity.city ? `, ${usCity.city}` : '' }
                             {usCity.state ? `, ${usCity.state}` : '' }{usCity.county ? ` (${usCity.county} County)` : '' }</span>
                         
                    </Link>
                </li>
                ))
                ) : (<li>No zip codes found</li>)}
        </ul>
      )}
    </div>
  )
}
