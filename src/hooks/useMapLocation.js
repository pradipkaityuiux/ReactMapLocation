import { useSearchParams } from "react-router-dom";

export function useMapLocation(){
    const [searchQuery, setSearchQuery] = useSearchParams();
    const lat = searchQuery.get("lat");
    const lng = searchQuery.get("lng");

    return [lat, lng]
}