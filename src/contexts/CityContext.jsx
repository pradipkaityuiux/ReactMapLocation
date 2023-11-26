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
    async function createCity(cityObj){
        try {
            setIsLoading(true)
            const res = await fetch(`${base_url}/cities`,{
                method: "POST",
                body: JSON.stringify(cityObj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setCities(cities => [...cities, data]);
        } catch (error) {
            alert("Error occured during fetching Data")
        }finally{
            setIsLoading(false)
        }
    }
    async function deleteCity(id){
        try {
            setIsLoading(true)
            await fetch(`${base_url}/cities/${id}`,{
                method: "DELETE",
            })
            setCities(cities => cities.filter(city => city.id != id));
        } catch (error) {
            alert("Error occured during fetching Data")
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity, deleteCity}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    return useContext(CitiesContext);
}

export { CityProvider, useCities }