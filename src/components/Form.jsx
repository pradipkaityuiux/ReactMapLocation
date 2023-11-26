// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button"
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useMapLocation } from "../hooks/useMapLocation";
import Message from "../components/Message"
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const {createCity} = useCities()

  const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
  const [lat, lng] = useMapLocation();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoLocation, setGeoLocation] = useState([]);
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(function(){
    if(!lat && !lng) return;

    async function fetchUrlPosition(){
      try {
        setGeoCodingError("");
        setIsLoadingGeoCoding(true);
        const response = await fetch(`${Base_Url}latitude=${lat}&longitude=${lng}`);
        const data = await response.json();

        if(!data.countryCode) throw new Error("That doesn't seem to be a Country. Click on Somewhere Else.")

        setCityName(data.locality);
        setCountry(data.countryName);
        setEmoji(data.countryCode)
        setGeoLocation(data);
      } catch (error) {
        setGeoCodingError(error.message);
      }finally{
        setIsLoadingGeoCoding(false)
      }
    }
    fetchUrlPosition();
  }, [lat, lng])

  async function handleSubmit(e){
    e.preventDefault();
    if(!cityName && !startDate) return;

    let cityObj = {
      cityName,
      country,
      emoji,
      date: startDate,
      notes,
      position: {lat, lng}
    }
    await createCity(cityObj);
    navigate('/app/cities');
  }

  if(isLoadingGeoCoding) return <Spinner/>
  if(geoCodingError) return <Message message={geoCodingError}/>
  if(!lat && !lng) return <Message message="Start by Clicking anywhere on the Map"/>

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button type='back' onClick={(e)=>{
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
