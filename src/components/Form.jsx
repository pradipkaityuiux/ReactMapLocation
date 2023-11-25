// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button"
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useMapLocation } from "../hooks/useMapLocation";
import Message from "../components/Message"
import Spinner from "./Spinner";

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
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
  const [lat, lng] = useMapLocation();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoLocation, setGeoLocation] = useState([]);
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(function(){
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

  if(isLoadingGeoCoding) return <Spinner/>

  if(geoCodingError) return <Message message={geoCodingError}/>

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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
