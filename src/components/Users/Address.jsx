import { useState } from "react";

const Address = ({ currentAddress, onAddressChange }) => {
    const [selectedAddress, setSelectedAddress] = useState(currentAddress || {});

    const handleChangeLocation = async () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            const headers = new Headers({
                'Accept-Language': 'en',
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
                    console.error('Error fetching address:', error);
                });
        });
    };

    return (
        <div className="form-group row">
            <div className="col-md-12">
                <label>Lives In</label>
                <div className="d-flex">
                    <textarea
                        type="text"
                        className="form-control"
                        name="location"
                        defaultValue={(Object.values(selectedAddress).length) ? (
                            `${selectedAddress.road}, ${selectedAddress.village}, \n ${selectedAddress.district}, ${selectedAddress.state}, \n ${selectedAddress.postcode}`
                        ) : 'No Location provided'}
                    />
                    <button
                        className="btn"
                        onClick={handleChangeLocation}
                    >
                        {(!Object.values(selectedAddress).length) ?
                            'Add Location'
                            :
                            'Change Location'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Address;
