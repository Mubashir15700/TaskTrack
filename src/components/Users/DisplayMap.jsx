import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const DisplayMap = ({ latitude, longitude }) => {
    useEffect(() => {
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
    }, [latitude, longitude]);

    return (
        <div
            id="map"
            className="m-2 mb-4 rounded-2"
            style={{ height: "200px", width: "100%" }}
        ></div>
    );
};

export default DisplayMap;
