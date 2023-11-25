import React from 'react'
import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import Message from "./Message";
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CityContext';


export default function CountryList() {
    const {cities, isLoading} = useCities();
    const countries = cities.filter((city, index, self) => {
        return index === self.findIndex((c) => c.country === city.country);
        }).map(({ country, emoji }) => ({ country, emoji }));

    if(isLoading) return <Spinner/>
    if (!cities.length) return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.id} country={country}/>)}
        </ul>
    )
}
