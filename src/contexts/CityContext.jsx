import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CityProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    const base_url = "http://localhost:9000";

    useEffect(function(){
        async function fetchCities(){
            try {
                setIsLoading(true)
                const res = await fetch(`${base_url}/cities`)
                const data = await res.json()
                setCities(data)
            } catch (error) {
                alert("Error occured during fetching Data")
            }finally{
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    async function getCity(id){
        try {
            setIsLoading(true)
            const res = await fetch(`${base_url}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data)
        } catch (error) {
            alert("Error occured during fetching Data")
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    return useContext(CitiesContext);
}

export { CityProvider, useCities }