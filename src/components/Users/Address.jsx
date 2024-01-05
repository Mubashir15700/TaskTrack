import { useState, useEffect } from "react";
import DisplayMap from '../../components/Users/DisplayMap';
import { getCurrentLocation } from '../../services/api';

const Address = ({ label, currentAddress, onAddressChange }) => {
    const [selectedAddress, setSelectedAddress] = useState(currentAddress || {});
    const [textareaValue, setTextareaValue] = useState('');
    const [mapVisible, setMapVisible] = useState(false);

    useEffect(() => {
        // Check if currentAddress has latitude and longitude
        if (selectedAddress && selectedAddress.lat && selectedAddress.lon) {
            setMapVisible(true);
        }

        setTextareaValue(
            (Object.values(selectedAddress).length) ? (
                `${selectedAddress.road}, ${selectedAddress.village}, \n ${selectedAddress.district}, ${selectedAddress.state}, ${selectedAddress.postcode}`
            ) : "No Location provided"
        );

    }, [selectedAddress]);

    const handleGetCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const response = await getCurrentLocation({ latitude, longitude });
            if (response) {
                setMapVisible(true);
                setSelectedAddress(response.data.fullAddress);
                onAddressChange(response.data.fullAddress);
            }
        });
    };

    return (
        <div className="form-group row">
            <div className="col-md-12">
                <label>{label}</label>
                <div className="d-flex align-items-center">
                    <textarea
                        type="text"
                        className="form-control w-75"
                        name="location"
                        defaultValue={textareaValue}
                    />
                    <div className="d-flex flex-column flex-md-row justify-content-around w-25">
                        <button
                            className="btn btn-primary rounded-5"
                            onClick={handleGetCurrentLocation}
                        >
                            <i className="bi bi-crosshair"></i>
                        </button>
                        <button
                            className="btn btn-outline-dark"
                        // onClick={handleEnterLocation}
                        >
                            Add
                        </button>
                    </div>
                </div>
                {mapVisible && (
                    <DisplayMap
                        latitude={selectedAddress.lat}
                        longitude={selectedAddress.lon}
                    />
                )}
            </div>
        </div>
    );
};

export default Address;
