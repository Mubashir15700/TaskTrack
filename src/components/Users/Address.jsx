import { useState, useEffect } from "react";

const Address = ({ label, currentAddress, onAddressChange }) => {
    const [selectedAddress, setSelectedAddress] = useState(currentAddress || {});
    const [textareaValue, setTextareaValue] = useState('');

    useEffect(() => {
        setTextareaValue(
            (Object.values(selectedAddress).length) ? (
                `${selectedAddress.road}, ${selectedAddress.village}, \n ${selectedAddress.district}, ${selectedAddress.state}, \n ${selectedAddress.postcode}`
            ) : "No Location provided"
        );
    }, [selectedAddress]);

    const handleChangeLocation = async () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            const headers = new Headers({
                "Accept-Language": "en",
            });

            fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    const fullAddress = {
                        road: data.address.road,
                        village: data.address.village,
                        district: data.address.state_district,
                        state: data.address.state,
                        postcode: data.address.postcode
                    };
                    setSelectedAddress(fullAddress);
                    onAddressChange(fullAddress);
                })
                .catch((error) => {
                    console.error("Error fetching address:", error);
                });
        });
    };

    return (
        <div className="form-group row">
            <div className="col-md-12">
                <label>{label}</label>
                <div className="d-flex align-items-center">
                    <textarea
                        type="text"
                        className="form-control"
                        name="location"
                        defaultValue={textareaValue}
                    />
                    <div>
                        <button
                            className="btn btn-primary rounded-5"
                            onClick={handleChangeLocation}
                        >
                            <i className="bi bi-crosshair"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
