import { useEffect } from "react";
import toast from "react-hot-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DisplayMap = ({ latitude, longitude }) => {

    useEffect(() => {
        try {
            // Check if map already exists
            const existingMap = L.DomUtil.get("map");

            // If the map already exists, remove it before creating a new one
            if (existingMap) {
                existingMap._leaflet_id = null;
            }

            const map = L.map("map").setView([latitude, longitude], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            L.marker([latitude, longitude]).addTo(map);
        } catch (error) {
            toast.error("Error while displaying map");
            console.log("Error while displaying map", error);
        }
    }, [latitude, longitude]);

    return (
        <div
            id="map"
            className="my-3 rounded-2"
            style={{ height: "200px", width: "100%" }}
        ></div>
    );
};

export default DisplayMap;
